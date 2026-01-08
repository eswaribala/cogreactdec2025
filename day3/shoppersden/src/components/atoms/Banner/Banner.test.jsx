import {render, screen} from '@testing-library/react';
import {describe, it,expect} from 'vitest';
import Banner from './Banner';


describe('Banner Component', () => {

    it('should render the Banner component', () => {
        render(<Banner />);        
        expect(screen.getByAltText('Shoppers Banner')).toBeInTheDocument();
    });
});