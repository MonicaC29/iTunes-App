import Header from "../header/header";
import { render, screen } from "@testing-library/react";

it("renderApp", () => {
  render(<Header />);
  const elements = screen.getByTestId("render");
  expect(elements).toBeInTheDocument();
});
