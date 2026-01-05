import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

export default function ProductsFromStore({ limit = 5 }) {
  const { products } = useSelector((s) => s.productState);

  const shown = limit ? products.slice(0, limit) : products;

  return (
    <Box>
      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" sx={{ mb: 1 }}>
        Products in Redux Store: {products.length}
      </Typography>

      <List>
        {shown.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText
              primary={`${item.id} - ${item.name}`}
              secondary={`${item.category} • ₹${item.price}`}
            />
          </ListItem>
        ))}
      </List>

      {!!limit && (
        <Typography variant="caption">
          (Showing first {limit} from Redux state)
        </Typography>
      )}
    </Box>
  );
}