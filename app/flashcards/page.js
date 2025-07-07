"use client";
export const dynamic = "force-dynamic";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import LaunchIcon from "@mui/icons-material/Launch";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import {
  Card,
  Box,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  Slide,
} from "@mui/material";

export default function FlashCards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }

    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }
  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#FFF8DC",
        padding: 4,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          mt: 2,
          fontWeight: 600,
          fontSize: "3rem",
          textAlign: "center",
          color: "#1a1a1a", // Flashcards
        }}
      >
        Saved Flashcards
      </Typography>
      <Container
        width="100vw"
        sx={{
          display: "flex",
          mt: 10,
          mb: 10,
          flexDirection: "column",
          justifyContent: "center",
          // backgroundColor: "#eee",
          backgroundColor: "#FFFAED",
          borderRadius: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            minHeight: "50vh",
            mt: 4,
            justifyContent: "center",
          }}
        >
          {flashcards.map((flashcard, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Slide direction={index % 2 === 0 ? "right" : "left"} in={true}>
                <Card
                  sx={{
                    minWidth: "250px",
                    height: "90px",
                    gap: 2,
                    borderRadius: "10px",
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      handleCardClick(flashcard.name);
                    }}
                  >
                    <CardContent
                      sx={{
                        backgroundColor:
                          "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                      }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ gap: 2 }}
                      >
                        <Typography variant="h6">{flashcard.name}</Typography>
                        <LaunchIcon />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
