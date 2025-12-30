import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!bookId) return;          // ✅ IMPORTANT: stop here if no id

    setBook(null);               // ✅ reset when id changes
    fetch(`${import.meta.env.VITE_BOOKS_API_BASE}/api/books/${bookId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Book not found");
        return res.json();
      })
      .then(setBook)
      .catch(() => setBook({ error: true }));
  }, [bookId]);

  if (!bookId) return null;      // ✅ nothing to render if no id
  if (!book) return <Typography>Loading...</Typography>;
  if (book.error) return <Typography>Book not found</Typography>;

  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Typography variant="h6">{book.title}</Typography>
      <Typography>Author: {book.author}</Typography>
      <Typography>ISBN: {book.isbn}</Typography>
      <Typography>Category: {book.category}</Typography>
      <Typography>Price: ₹{book.price}</Typography>
    </Box>
  );
}
