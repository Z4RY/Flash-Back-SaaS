import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn, SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <Container maxWidth="100vw" sx={{
      backgroundColor: "#FFF8DC", // Warm off-white background
      minHeight: "100vh",
      padding: 0,
      margin: 0,
      maxWidth: "100% !important"
    }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ 
          py: 8,
          px: 4,
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {/* <Typography 
          variant="h4" 
          sx={{
            color: '#333333',
            fontWeight: 700,
            mb: 8,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontSize: '1.5rem'
          }}>
          Quick Revision Made Easy
        </Typography> */}

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ 
            width: '100%',
            gap: 8,
            mb: 6
          }}
        >
          {/* Left Column */}
          <Box sx={{ flex: 1, maxWidth: '300px' }}>
            <Typography variant="h6" 
              sx={{
                color: '#333333',
                fontWeight: 600,
                mb: 2,
                mt:20,
                letterSpacing: '0.05em',
                fontSize: '1.1rem',
                textTransform: 'uppercase'
              }}>
              Create & Organize
            </Typography>
            <Typography 
              sx={{
                color: '#666666',
                fontSize: '1rem',
                lineHeight: 1.8,
                fontWeight: 400
              }}>
              Create digital flashcards instantly. Organize them into decks by subject, topic, or exam. Perfect for students, professionals, and lifelong learners seeking efficient study methods.
            </Typography>
          </Box>

          {/* Center Column - Sign In Form */}
          <Box sx={{ 
            flex: 1, 
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Typography variant="h6" 
              sx={{
                color: '#333333',
                fontWeight: 600,
                mb: 4,
                letterSpacing: '0.05em',
                fontSize: '2.1rem',
                textTransform: 'uppercase'
              }}>
              Sign In
            </Typography>
            <SignIn />
          </Box>

          {/* Right Column */}
          <Box sx={{ flex: 1, maxWidth: '300px' }}>
            <Typography variant="h6" 
              sx={{
                color: '#333333',
                fontWeight: 600,
                mb: 2,
                mt:20,
                letterSpacing: '0.05em',
                fontSize: '1.1rem',
                textTransform: 'uppercase'
              }}>
              Learn & Remember
            </Typography>
            <Typography 
              sx={{
                color: '#666666',
                fontSize: '1rem',
                lineHeight: 1.8,
                fontWeight: 400
              }}>
              Use spaced repetition and active recall to enhance your memory. Track your progress, set study schedules, and review anywhere, anytime with our smart revision system.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}