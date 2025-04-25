import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Experience from "../../src/pages/MainContent/Experience";

const mockSubmitFeedback = vi.fn();
const mockRefetchUser = vi.fn();
const mockOnDoneClick = vi.fn();

vi.mock("../../src/hooks/useUserFeedback", () => {
  return {
    default: () => ({
      submitFeedback: mockSubmitFeedback,
    }),
  };
});

vi.mock("../../src/hooks/useGetUserInfo", () => {
  return {
    default: () => ({
      refetchUser: mockRefetchUser,
    }),
  };
});

vi.mock("../../src/components/RatingSlider", () => ({
  default: (props) => (
    <input
      type="range"
      data-testid="rating-slider"
      min={props.min}
      max={props.max}
      value={props.value}
      onChange={(e) => props.onChange(e, Number(e.target.value))}
    />
  ),
}));

vi.mock("../../src/components/CustomButton", () => ({
  default: (props) => (
    <button type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  ),
}));

vi.mock("../../src/assets/experienceQuestion", () => ({
  experienceQuestions: [
    { id: 1, title: "Pain Level", description: "How much pain are you feeling?" },
    { id: 2, title: "Swelling", description: "Is there any swelling?" },
    { id: 3, title: "Stiffness", description: "How stiff do you feel?" },
    { id: 4, title: "Fatigue Level", description: "How tired do you feel after exercise?" },
    { id: 5, title: "Strength Perception", description: "How strong do you feel?" },
    { id: 6, title: "Functional Improvement", description: "Are you improving functionally?" },
    { id: 7, title: "Exercise Tolerance", description: "How well can you tolerate exercise?" },
  ],
}));

describe("Experience - full question flow with custom values", () => {
  const ratings = [4, 7, 2, 10, 5, 9, 3];

  beforeEach(() => {
    render(<Experience onDoneClick={mockOnDoneClick} />);
    mockSubmitFeedback.mockClear();
    mockRefetchUser.mockClear();
    mockOnDoneClick.mockClear();
  });

  it("goes through all questions with different values and submits feedback", async () => {
    const totalQuestions = ratings.length;

    for (let i = 0; i < totalQuestions; i++) {
      const ratingValue = ratings[i];

      expect(screen.getByText(new RegExp(`${i + 1}\\.`))).toBeInTheDocument();

      const slider = screen.getByTestId("rating-slider");
      fireEvent.change(slider, { target: { value: `${ratingValue}` } });

      const button = screen.getByRole("button", {
        name: i === totalQuestions - 1 ? /done/i : /next/i,
      });
      fireEvent.click(button);

      if (i < totalQuestions - 1) {
        await waitFor(() => {
          expect(screen.getByText(new RegExp(`${i + 2}\\.`))).toBeInTheDocument();
        });
      }
    }

    await waitFor(() => {
      expect(mockSubmitFeedback).toHaveBeenCalledWith({
        pain_level: 4,
        swelling: 7,
        stiffness: 2,
        fatigue_level: 10,
        strength_perception: 5,
        functional_improvement: 9,
        exercise_tolerance: 3,
      });

      expect(mockRefetchUser).toHaveBeenCalled();
      expect(mockOnDoneClick).toHaveBeenCalled();
    });
  });
});
