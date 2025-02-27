"use client"
import { useState } from "react";
import Dropzone from "react-dropzone";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import {
  Description,
  UploadFile,
  CheckCircleOutline,
} from "@mui/icons-material";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const FileUploader = ({ onFileProcessed, onGenerate }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleDropAccepted = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    setIsFileUploaded(false); // Reset the state if a new file is uploaded
    parseFile(file);
    setIsDragOver(false);
  };

  const parseFile = (file) => {
    setIsUploading(true);
    if (file.type === "text/plain") {
      readTxtFile(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      readDocxFile(file);
    } else if (file.type === "application/pdf") {
      readPdfFile(file);
    }
  };

  const readTxtFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      onFileProcessed(content);
      finishUpload();
    };
    reader.readAsText(file);
  };

  const readDocxFile = (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      const result = await mammoth.extractRawText({ arrayBuffer });
      onFileProcessed(result.value);
      finishUpload();
    };
    reader.readAsArrayBuffer(file);
  };

  const readPdfFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      try {
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        if (pdf.numPages === 0) {
          throw new Error("The PDF has no pages.");
        }

        let extractedText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          extractedText += pageText + "\n";
        }

        onFileProcessed(extractedText);
        finishUpload();
      } catch (error) {
        console.error("Error processing PDF: ", error);
        alert("There was an error processing the PDF. Please try again.");
        finishUpload();
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const finishUpload = () => {
    setUploadProgress(100);
    setIsUploading(false);
    setIsFileUploaded(true); // Indicate that the file was successfully uploaded
  };

  const handleDropRejected = () => {
    setIsDragOver(false);
    alert("Unsupported file type. Please upload a DOCX, TXT, or PDF file.");
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 6,
        mb: 4,
        borderRadius: 4,
        textAlign: "center",
        border: isDragOver ? "2px dashed #FFC107" : "2px dashed #ddd", // Soft yellow for dragging
        backgroundColor: isDragOver ? "#FFF9C4" : "#FFF", // Light yellow when dragging
        transition: "background-color 0.3s, border-color 0.3s", // Smooth transition effects
      }}
    >
      {!isFileUploaded ? (
        <Dropzone
          onDropAccepted={handleDropAccepted}
          onDropRejected={handleDropRejected}
          accept={{
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              [".docx"],
            "text/plain": [".txt"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isUploading ? (
                <CircularProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ color: "#FFC107", mb: 2 }} // Golden color for progress
                />
              ) : isDragOver ? (
                <UploadFile sx={{ fontSize: 50, color: "#FFC107", mb: 2 }} /> // Larger and colored icon
              ) : (
                <Description sx={{ fontSize: 50, color: "#757575", mb: 2 }} />
              )}
              <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                {isUploading
                  ? `Uploading ${uploadedFile?.name}...`
                  : isDragOver
                  ? "Drop file here to upload"
                  : "Drag and drop a file here, or click to select one"}
              </Typography>
              {!isUploading && !isDragOver && (
                <Typography variant="caption" color="textSecondary">
                  Supported: DOCX, TXT, PDF files
                </Typography>
              )}
            </div>
          )}
        </Dropzone>
      ) : (
        <Box>
          <CheckCircleOutline
            sx={{
              fontSize: 60,
              color: "#4CAF50",
              mb: 2,
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
          <Typography variant="h6" sx={{ color: "#4CAF50" }}>
            File uploaded successfully!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "#616161",
            }}
          >
            Use the Generate button below or{" "}
            <span
              style={{
                color: "#FFB74D",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => setIsFileUploaded(false)}
            >
              re-upload
            </span>{" "}
            another file.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default FileUploader;
