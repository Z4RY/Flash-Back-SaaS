"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import Image from "next/image"
import getStripe from "@/utils/get-stripe"
import { Container, Typography, Button, Box, Grid, Card, CardContent } from "@mui/material"
import Link from "next/link"

export default function Home() {
  const handleAnnualSubmit = async () => {
    const response = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan: "annual" }),
    })
    const session = await response.json()
    if (session.id) {
      const stripe = await getStripe()
      await stripe.redirectToCheckout({ sessionId: session.id })
    }
  }

  const handleMonthlySubmit = async () => {
    const response = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan: "monthly" }),
    })
    const session = await response.json()
    if (session.id) {
      const stripe = await getStripe()
      await stripe.redirectToCheckout({ sessionId: session.id })
    }
  }

  return (
    <>
      <Box sx={{ background: "#FFF8DC", minHeight: "100vh" }}>

        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 12 }, pb: 12 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: "540px" }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    fontWeight: 700,
                    color: "#333",
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  Turn notes into flashcards.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    color: "#555",
                    mb: 5,
                    lineHeight: 1.6,
                  }}
                >
                  For students & learners who want fast, effective study tools without the hassle. It's like if Zomato
                  had a cute little AI-powered flashcard service baby.
                </Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Link href="/generate" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#333",
                        color: "#fff",
                        py: 1.5,
                        px: 4,
                        borderRadius: "24px",
                        textTransform: "none",
                        fontSize: "1.125rem",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#555",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#333",
                      borderColor: "#333",
                      py: 1.5,
                      px: 4,
                      borderRadius: "24px",
                      textTransform: "none",
                      fontSize: "1.125rem",
                      "&:hover": {
                        borderColor: "#555",
                        backgroundColor: "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    See how it works
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "300px", md: "400px" },
                  width: "100%",
                }}
              >
                <Image
                  src="https://i.pinimg.com/originals/b4/a0/af/b4a0afe807e23d7cfa9347069412dea3.gif"
                  alt="Illustration of person throwing paper airplane"
                  fill
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    mixBlendMode: "multiply"
                  }}
                  priority
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Features Section */}
        <Box sx={{ py: { xs: 10, md: 12 }, background: "#FFF8DC" }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                color: "#333",
                mb: 2,
              }}
            >
              Here's some of the highlights of the features you get
            </Typography>

            <Typography
              align="center"
              sx={{
                fontSize: "1.125rem",
                color: "#555",
                mb: 10,
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              when you build flashcards with our service.
            </Typography>

            <Grid container spacing={10}>
              {[
                {
                  
                  title: "AI Powered",
                  description:
                    "All your content is processed by our advanced AI. This is the infrastructure that powers the world's biggest study tools, not a server running out of a garage. You're in good hands.",
                  image: "https://i.pinimg.com/736x/97/c0/f3/97c0f32972e618731803f09f93cd11cd.jpg",
                  
                },
                {
                  title: "Instant Creation",
                  description:
                    "When you're done pasting text or uploading a document, just click 'Generate' and it's live. No hassle, no complex setup. It lets you quickly iterate and tailor it works how you work.",
                  image: "https://i.pinimg.com/736x/11/fe/3c/11fe3cdc7deaaa3a49bb771a05c30b61.jpg",
                },
                {
                  title: "Study Anywhere",
                  description:
                    "Access your flashcards from any device, anywhere. Perfect for studying on the go, during commutes, or whenever you have a few minutes to spare. Your learning is no longer tied to a specific location.",
                  image: "https://i.pinimg.com/736x/ea/94/bf/ea94bf4cbe022337a914ce27279196b4.jpg",
                },
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: index % 2 === 0 ? "flex-start" : "center",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "120px",
                        height: "120px",
                        mb: 3,
                        
                      }}
                    >
                      <Image
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        width={250}
                        height={200}
                        style={{ layout: "fill",
                          objectFit: "cover",
                          mixBlendMode: "multiply"  }}
                      />
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        mb: 2,
                        mt: 10,
                        color: "#333",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#555",
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

