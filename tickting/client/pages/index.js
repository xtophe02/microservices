import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import Link from "../src/Link";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/auth/signup" color="secondary">
          Go to the signup
        </Link>
      </Box>
    </Container>
  );
}
