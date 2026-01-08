import {render, screen} from '@testing-library/react';
import {describe, it,expect,vi} from 'vitest';
import Banner from './Banner';

vi.mock('../../../assets/shopperbanner.jpeg', () => ({
    default: 'shopperbanner.jpeg',
}));

describe('Banner Component', () => {

    it('should render the Banner component', () => {
        render(<Banner />);        
        expect(screen.getByAltText('Shoppers Banner')).toBeInTheDocument();
    });

    it('should have the correct src attribute', () => {
        render(<Banner />);        
        expect(screen.getByAltText('Shoppers Banner')).toHaveAttribute('src', 'shopperbanner.jpeg');
    });

});