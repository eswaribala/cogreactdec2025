import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../redux/actions/productActions";

import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  Stack,
} from "@mui/material";

export default function Admin() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((s) => s.productState);

  const [form, setForm] = useState({ name: "", category: "", price: "" });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const category = form.category.trim();
    const price = Number(form.price);

    if (!name || !category || !price) return;

    dispatch(addProduct({ name, category, price }));
    setForm({ name: "", category: "", price: "" });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Admin - Add Product
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Product name"
            name="name"
            value={form.name}
            onChange={onChange}
            fullWidth
          />

          <TextField
            label="Category (Men/Women/Kids)"
            name="category"
            value={form.category}
            onChange={onChange}
            fullWidth
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={onChange}
            fullWidth
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Products in Redux Store: {products.length}
      </Typography>

      <List>
       {products.map((item) => (
        <ListItem key={item.id} divider>
          <ListItemText
            primary={`${item.id} - ${item.name}`}
            secondary={`${item.category} • ₹${item.price}`}
          />
        </ListItem>
      ))}
      </List>

      <Typography variant="caption">
        (Showing first 5 from Redux state)
      </Typography>
    </Box>
  );
}
