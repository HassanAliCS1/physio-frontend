import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import Dashboard from "../../src/pages/MainContent/Dashboard";

vi.mock("../../src/hooks/useGetExerciseReport", () => ({
    default: () => ({
        reportData: [
            { date: new Date(Date.now() - 2 * 86400000).toISOString(), count: 5 },
            { date: new Date(Date.now() - 1 * 86400000).toISOString(), count: 8 },
        ],
        reportDataByTime: [
            { period: "morning", percentage: "50" },
            { period: "afternoon", percentage: "30" },
            { period: "evening", percentage: "20" },
        ],
    }),
}));

vi.mock("recharts", () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    BarChart: ({ children }) => <div>{children}</div>,
    Bar: () => <div>Bar</div>,
    XAxis: () => <div>XAxis</div>,
    Tooltip: () => <div>Tooltip</div>,
    PieChart: ({ children }) => <div>{children}</div>,
    Pie: ({ children }) => <div onClick={() => { }}>{children}</div>,
    Cell: () => <div>Cell</div>,
}));

describe("Dashboard", () => {
    beforeEach(() => {
        render(<Dashboard />);
    });

    it("renders the Exercise Report bar chart section", async () => {
        expect(screen.getByText("Exercise Report")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/Last \d+ days/)).toBeInTheDocument();
        });
    });

    it("renders the Exercise Time pie chart section", async () => {
        expect(screen.getByText("Exercise Time")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/Morning/)).toBeInTheDocument();
            expect(screen.getByText(/30%/)).toBeInTheDocument();
        });
    });

    it("shows the tooltip when a pie segment is clicked", async () => {
        const legendItems = await screen.findAllByText(/Morning|Afternoon|Evening/);
        fireEvent.click(legendItems[0]);

        await waitFor(() => {
            expect(screen.getByText("Morning")).toBeInTheDocument();
            expect(screen.getByText((text) => text.includes("50%"))).toBeInTheDocument();
        });
    });

});
