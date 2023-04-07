import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Home from "../index";

describe('Home', () => {
    it(('renders home page') , () => {
        render(<Home/>);
        
        expect(screen.getByTestId('homeContainer')).toBeInTheDocument();
    })
})