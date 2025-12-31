import React from 'react';
import { useState, useMemo } from 'react';
import './SimpleCategory.css';

function useSimpleCategory( title, items) {
   const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;

    return items.filter((item) => {
      const name = String(item?.name ?? "").toLowerCase();
      const category = String(item?.category ?? "").toLowerCase();
      const price = String(item?.price ?? "").toLowerCase(); // optional

      return (
        name.includes(q) ||
        category.includes(q) ||
        price.includes(q)
      );
    });
  }, [items, search]);

  return { title, search, setSearch, items: filteredItems };
}



export default useSimpleCategory;
