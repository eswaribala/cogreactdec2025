import {render,screen} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import Timer from './Timer';
describe('Timer Component', () => {

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));     
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders the currret time correctly', () => {              
        render(<Timer />);        
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });
});