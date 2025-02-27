"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);

  const handleOpenUpgrade = () => {
    setOpenUpgradeModal(true);
  };

  const handleCloseUpgrade = () => {
    setOpenUpgradeModal(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#FFF8DC',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          padding: '8px 16px',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '64px',
          }}
        >
          {/* Brand/Logo */}
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              color: '#2D3748',
            }}
          >
            {/* <Image
              src="/back"
              alt="logo"
              width={40}
              height={40}
              style={{ marginRight: '8px' }}
            /> */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ color: '#FB1818' }}>Flash</span>
              <span style={{ color: '#1a1a1a' }}>Back</span>
            </Link>
          </Typography>

          {/* Links and User Options */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <SignedOut>
              <Button
                href="sign-in"
                sx={{
                  color: '#2D3748',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(45, 55, 72, 0.04)',
                  },
                }}
              >
                Login
              </Button>
              <Button
                href="sing-up"
                variant="contained"
                sx={{
                  backgroundColor: '#FB1818',
                  color: '#ffffff',
                  fontWeight: 500,
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#FF7A47',
                    boxShadow: 'none',
                  },
                }}
              >
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                href="/flashcards"
                sx={{
                  color: '#2D3748',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(45, 55, 72, 0.04)',
                  },
                }}
              >
                My Collection
              </Button>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
