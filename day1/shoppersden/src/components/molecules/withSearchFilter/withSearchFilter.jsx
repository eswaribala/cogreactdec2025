import React from 'react';
import { useMemo, useState } from "react";
import './withSearchFilter.css';

const withSearchFilter = (Wrapped,title) => {
  return function WithSearchFilterComponent({ items}) {
    const safeItems = Array.isArray(items) ? items : items?.data ?? [];

      const [search, setSearch] = useState("");
    const filteredItems = useMemo(() => {
      const q = search.trim().toLowerCase();
      if (!q) return safeItems;

      return safeItems.filter((i) =>
        String(i?.name ?? "").toLowerCase().includes(q)
      );
    }, [safeItems, search]);

    return (
      <Wrapped
        title={title}
        items={filteredItems}
        search={search}
        setSearch={setSearch}
      />
    );
  };
};



export default withSearchFilter;
