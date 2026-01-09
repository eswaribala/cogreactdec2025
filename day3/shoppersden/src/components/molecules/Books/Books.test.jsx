import React from 'react';
import{render,screen,waitFor,within} from '@testing-library/react';
import Books from './Books.jsx';
import userEvent from '@testing-library/user-event';
import {describe,test,expect,beforeEach,afterEach,vi} from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const mockBooksData=Array.from({length:8}).map((_,i)=>({
  id:`book-${i+1}`,
  title:`Book Title ${i+1}`,
  author:`Author ${i+1}`,
    description:`Description for Book ${i+1}`,
    publishedDate:`2023-0${(i%9)+1}-15`
}));

describe('Books Component',()=>{
  beforeEach(()=>{
    global.fetch=vi.fn().mockResolvedValue({
      json:vi.fn().mockResolvedValue({
        items:mockBooksData,    
        totalItems:8,
        totalPages:2
      })
    });
  });

  afterEach(()=>{
    vi.restoreAllMocks();
  });

    test('calls api',async()=>{
        render(<MemoryRouter><Books apiUrl={import.meta.env.VITE_BOOKS_BASEURL}/></MemoryRouter>);
        await waitFor(()=>{
          expect(global.fetch).toHaveBeenCalledWith(`${import.meta.env.VITE_BOOKS_BASEURL}?page=1&limit=4`);    
        }

    );
    expect(mockBooksData).toHaveLength(8);
    const headings=await screen.findAllByRole("heading", { level: 6 });
    expect(headings).toHaveLength(8); // 8 items per page
    expect(screen.queryByText("Book Title 1")).toBeInTheDocument();
    expect(screen.queryByText("Book Title 4")).toBeInTheDocument();
    expect(screen.queryByText("Book Title 5")).toBeInTheDocument();
    expect(screen.queryByText("Book Title 9")).not.toBeInTheDocument();
    
       
  

});
});


