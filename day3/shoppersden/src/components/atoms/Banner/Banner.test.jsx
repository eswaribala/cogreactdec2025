import {render, screen} from '@testing-library/react';
import Banner from './Banner';
import { it } from 'vitest';

describe('Banner Component', () => {

    it('should render the Banner component', () => {
        render(<Banner />);        
        expect(screen.getByAltText('Shoppers Banner')).toBeInTheDocument();
    });
});