import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { describe } from "node:test";
import Home from "src";

describe('Home', () => {
    it('renders home page') , () => {
        render(<Home/>)
        //expect(screen.getByTestId('homeContainer').toBeInTheDocument());
    }
})