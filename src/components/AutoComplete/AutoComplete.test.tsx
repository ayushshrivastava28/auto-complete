import { render, screen } from "@testing-library/react";
import AutoComplete from "./";
import { fetchSuggestions } from "../../utils/api";

// Mock the fetchSuggestions API
jest.mock("../../utils/api", () => ({
  fetchSuggestions: jest.fn(),
}));

describe("AutoComplete", () => {
  test("renders input element correctly", () => {
    render(<AutoComplete />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("checks accessibility roles and properties", () => {
    render(<AutoComplete />);
    const input = screen.getByRole("combobox");

    expect(input).toHaveAttribute("aria-autocomplete", "list");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });
});
