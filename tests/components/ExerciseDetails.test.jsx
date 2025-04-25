import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ExerciseDetails from "../../src/pages/MainContent/ExerciseDetails";

const mockOnBack = vi.fn();
const mockOnLastSlideNext = vi.fn();

const mockInjuryImages = [
  { image: "image1.jpg", description: "Step 1 description" },
  { image: "image2.jpg", description: "Step 2 description" },
  { image: "image3.jpg", description: "Step 3 description" },
];

vi.mock("../../src/hooks/useGetUserInfo", () => ({
  default: () => ({
    injuryImages: mockInjuryImages,
    user: { level: 1 },
  }),
}));

beforeEach(() => {
  vi.stubGlobal("localStorage", {
    getItem: vi.fn((key) => (key === "user_token" ? "mock-token" : null)),
  });
  vi.stubGlobal("sessionStorage", {
    getItem: vi.fn(() => null),
  });
  mockOnBack.mockClear();
  mockOnLastSlideNext.mockClear();
});

const getVisibleImageByAlt = (alt) => {
  return screen.getAllByAltText(alt).find(
    (el) => window.getComputedStyle(el).display !== "none"
  );
};

describe("ExerciseDetails", () => {
  beforeEach(() => {
    render(<ExerciseDetails onBack={mockOnBack} onLastSlideNext={mockOnLastSlideNext} />);
  });

  it("renders exercise title and first image", () => {
    expect(screen.getByText("Exercise")).toBeInTheDocument();

    const image = getVisibleImageByAlt("Exercise step 1");
    expect(image).toBeInTheDocument();

    expect(screen.getByText("Step 1 description")).toBeInTheDocument();
  });

  it("navigates to the next slide", async () => {
    const nextArrow = document.querySelector(".custom-arrow.right");
    fireEvent.click(nextArrow);

    await waitFor(() => {
      const image = getVisibleImageByAlt("Exercise step 2");
      expect(image).toBeInTheDocument();
      expect(screen.getByText("Step 2 description")).toBeInTheDocument();
    });
  });

  it("calls onLastSlideNext when clicking next on the last slide", async () => {
    const nextArrow = document.querySelector(".custom-arrow.right");
    await waitFor(() => {
      expect(getVisibleImageByAlt("Exercise step 3")).toBeInTheDocument();
      fireEvent.click(nextArrow);
      expect(mockOnLastSlideNext).toHaveBeenCalled();
    });
  });

  it("calls onBack when clicking back on the first slide", () => {
    const prevArrow = document.querySelector(".custom-arrow.left");
    fireEvent.click(prevArrow);
    expect(mockOnBack).toHaveBeenCalled();
  });
});
