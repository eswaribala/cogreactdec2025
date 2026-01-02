import React, { use } from 'react';

import './withSearchFilter.css';
function withSearchFilter(WrappedComponent, title) {
  return function WithSearchFilter(items) {
    const [search, setSearch] = React.useState('');

    const filteredItems = useMemo(() => {
      const q=search.toLowerCase();
      return items.filter((item) => item.name.toLowerCase().includes(q));
    }, [items, search]);

    return (
      <WrappedComponent
        title={title}
        items={filteredItems}
        search={search}
        setSearch={setSearch}
      />
    );

  }



}



export default withSearchFilter;
