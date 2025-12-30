import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Pagination,
  Stack,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import BookDetails from "../BookDetails/BookDetails.jsx";
import { useParams } from "react-router-dom";

export default function Books() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10); // change to 25 if you want

  const [totalPages, setTotalPages] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
   const { bookId } = useParams()
      const open = Boolean(bookId); 
  const fetchBooks = React.useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const url = `${import.meta.env.VITE_BOOKS_API_BASE}/api/books?page=${page}&limit=${limit}`;
      const res = await fetch(url);

      if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

      const data = await res.json();

      setItems(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
     
      // If backend clamps page, sync UI
      if (data.page && data.page !== page) setPage(data.page);
    } catch (e) {
      setError(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  React.useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handlePageChange = (event, value) => {
    setPage(value); // MUI Pagination is 1-based
  };
  const handleOpenDetails = (book) => {
    // Open book details popup + update route param
    navigate(`/dashboard/books/${book.id}`);
  }

  function handleClose() {
    // Close book details popup + reset route param
    navigate(`/dashboard/books/`, { replace: true });
  }

  

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h5" fontWeight={700}>
            Books
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Total: <b>{totalItems}</b> • Page <b>{page}</b> / <b>{totalPages}</b> • Limit <b>{limit}</b>
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Stack alignItems="center" sx={{ py: 5 }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              Loading...
            </Typography>
          </Stack>
        ) : (
          <List sx={{ mt: 1 }}>
            {items.map((b, idx) => (
              <React.Fragment key={b.id}>
                <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                  <ListItemAvatar>
                    <Avatar  sx={{ cursor: "pointer", bgcolor: "primary.main" }} onClick={(e) => {
        e.stopPropagation();      // 🔴 important
        handleOpenDetails(b);  // opens popup + route param
      }}>
                      <MenuBookIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                   disableTypography  
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {b.title}
                        </Typography>
                        <Chip size="small" label={b.category} variant="outlined" />
                        <Chip size="small" label={b.publishedYear} />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          by <b>{b.author}</b>
                        </Typography>

                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 0.75 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <StarIcon fontSize="small" />
                            <Typography variant="body2">{b.rating}</Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CurrencyRupeeIcon fontSize="small" />
                            <Typography variant="body2">{b.price}</Typography>
                          </Box>

                          <Typography variant="body2" sx={{ opacity: 0.75 }}>
                            ISBN: {b.isbn}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>

                {/* Divider except after last item */}
                {idx !== items.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}

            {!items.length && !error && (
              <Typography variant="body2" sx={{ p: 2, opacity: 0.8 }}>
                No books found.
              </Typography>
            )}
          </List>
        )}

        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            disabled={loading || totalPages <= 1}
          />
        </Stack>
      </Paper>
       {/* ✅ DIALOG */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Book Details</DialogTitle>

        <DialogContent dividers>
          {open && <BookDetails />}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
