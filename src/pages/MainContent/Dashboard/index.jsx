import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { assets } from "../../../assets/assets";
import useGetExerciseReport from "../../../hooks/useGetExerciseReport";

const Dashboard = () => {
    const { reportData, reportDataByTime } = useGetExerciseReport();
    const [selectedData, setSelectedData] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [dateRange, setDateRange] = useState("");

    useEffect(() => {
        if (reportData.length > 0) {
            const sortedDates = reportData.map(item => new Date(item?.date)).sort((a, b) => a - b);

            const startDate = sortedDates[0];
            const endDate = sortedDates[sortedDates?.length - 1];

            const options = { month: "short", year: "numeric" };
            const monthYear = new Intl.DateTimeFormat("en-GB", options)?.format(startDate);

            setDateRange(`From ${startDate?.getDate()}-${endDate?.getDate()} ${monthYear}`);
        }
    }, [reportData]);

    const currentDate = new Date();

    const last14DaysData = reportData.filter((item) => {
        const reportDate = new Date(item.date);
        const differenceInDays = (currentDate - reportDate) / (1000 * 3600 * 24);
        return differenceInDays <= 14;
    });

    const formattedData = last14DaysData.map((item) => {
        const date = new Date(item.date);
        const day = date.getDate();
        return { ...item, date: day };
    });

    const handlePieClick = (data, index, event) => {
        if (!event || !event.nativeEvent) return;
        setSelectedData(reportDataByTime[index]);
        setTooltipPosition({
            x: event.nativeEvent.pageX,
            y: event.nativeEvent.pageY - 50
        });
    };

    return (
        <div className="dashboard-container">
            <h2 className="title">Dashboard</h2>
            <div className="grid-container">
                <div className="card border-right">
                    <h4 className="card-title">Exercise Report</h4>
                    <p className="card-subtitle">{` ${dateRange}`}</p>
                    {formattedData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200} style={{ marginTop: '40px' }}>
                            <BarChart data={formattedData}>
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(tick) => `${tick}`}
                                />
                                <Tooltip />
                                <Bar dataKey="count" fill="#5A6ACF" barSize={8} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="no-data-message">
                            No data to display
                        </div>
                    )}
                    <span className="chart-label">
                        {formattedData.length > 0 ? (
                            <>
                                <span className="legend-dot" style={{ backgroundColor: "#5A6ACF" }}></span>
                                Last {formattedData?.length} days
                            </>
                        ) : (
                            <></>
                        )}
                    </span>
                </div>

                <div className="card relative">
                    <h4 className="card-title">Exercise Time</h4>
                    {formattedData.length > 0 ? (
                        <p className="card-subtitle">{`From ${dateRange}`}</p>
                    ) : (
                        <></>
                    )}

                    {formattedData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={reportDataByTime?.map(entry => ({
                                        ...entry,
                                        percentage: parseFloat(entry?.percentage)
                                    }))}
                                    dataKey="percentage"
                                    innerRadius={50}
                                    outerRadius={80}
                                    labelLine={false}
                                    onClick={handlePieClick}
                                >
                                    {reportDataByTime?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={["#5A6ACF", "#C7CEFF", "#8593ED"][index % 3]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="no-data-message">
                            No data to display
                        </div>
                    )}

                    {formattedData.length > 0 ? (
                        <div className="custom-legend">
                            {reportDataByTime?.map((entry, index) => (
                                <div key={index} className="legend-item">
                                    <span className="legend-dot" style={{ backgroundColor: ["#5A6ACF", "#C7CEFF", "#8593ED"][index % 3] }}></span>
                                    <div className="legend-labels">
                                        <span className="legend-name">
                                            {`${entry?.period?.charAt(0).toUpperCase() + entry?.period?.slice(1)}`}
                                        </span>&nbsp;
                                        <span className="legend-percentage"> {` - ${parseFloat(entry?.percentage)?.toFixed(0)}%`}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}

                    {selectedData && (
                        <div
                            className="custom-tooltip"
                            style={{
                                top: `${tooltipPosition.y}px`,
                                left: `${tooltipPosition.x}px`
                            }}
                        >
                            <p className="tooltip-title">
                                {selectedData?.period.charAt(0).toUpperCase() + selectedData?.period.slice(1)}
                            </p>
                            <p className="tooltip-percentage">{selectedData?.percentage}%</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="card card3">
                <h4 className="card-title">Your Rating</h4>
                <p className="card-subtitle">Your progress report</p>
                <div className="rating-box">
                    <img src={assets?.comingSoon} alt="Coming Soon" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;