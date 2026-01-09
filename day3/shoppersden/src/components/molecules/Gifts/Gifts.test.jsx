import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Gifts from './Gifts';
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';


//Mock Data
const mockGifts = Array.from({ length: 6}).map((_, i) => ({  
    id: i + 1,
    name: `Gift ${i + 1}`,
    description: `Description for Gift ${i + 1}`,
    price: (i + 1) * 10,
    image:`img${i + 1}.jpg`
}));

describe('Gifts Component', () => {
    beforeEach(() => {
       global.fetch = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue({ gifts: mockGifts }),
       });
    });
    afterEach(() => {
        vi.resetAllMocks();
    });
    it('calls api to fetch gifts on mount', async () => {
        render(<Gifts apiUrl={import.meta.env.VITE_GIFT_ENDPOINT} />);
        await waitFor(() => 
            expect(global.fetch).toHaveBeenCalledWith(import.meta.env.VITE_GIFT_ENDPOINT)
        );
        
       
    });

});
