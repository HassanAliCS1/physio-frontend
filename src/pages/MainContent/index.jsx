import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import HeaderBar from "../../components/HeaderBar";
import Dashboard from "./Dashboard";
import Accounts from "./Account";
import Experience from "./Experience";
import Exercise from "./Exercise";
import ExerciseDetails from "./ExerciseDetails";
import EditAccount from "./Account/components/EditAccount";
import { Grid } from "@mui/material";

const MainContent = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("dashboard");
    const [showExerciseDetails, setShowExerciseDetails] = useState(false);
    const [showExperienceDetails, setShowExperienceDetails] = useState(false);

    const renderContent = () => {
        if (showExperienceDetails) {
            return (
                <Experience
                    onDoneClick={() => {
                        setShowExperienceDetails(false);
                        setSelectedMenu("dashboard");
                    }}
                />
            );
        }
        if (showExerciseDetails) {
            return (
                <ExerciseDetails
                    onBack={() => setShowExerciseDetails(false)}
                    onLastSlideNext={() => {
                        setSelectedMenu("exercise");
                        setShowExerciseDetails(false);
                        setShowExperienceDetails(true);
                    }}
                />
            );
        }

        switch (selectedMenu) {
            case "dashboard":
                return <Dashboard />;
            case "exercise":
                return <Exercise onStart={() => setShowExerciseDetails(true)} />;
            case "accounts":
                return <Accounts setEditOpen={setEditOpen} editOpen={editOpen} />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="main-container">
            <Grid className="header-bar">
            <HeaderBar />
            </Grid>
            <Grid md={12} className="main-content-wrapper">
                <Grid md={4} className="side-bar">
                    <SideBar
                        onSelect={(menu) => {
                            setSelectedMenu(menu);
                            setShowExerciseDetails(false);
                            setShowExperienceDetails(false);
                        }}
                        selected={selectedMenu}
                    />
                    </Grid>
                <Grid md={8} className="main-content">
                    {renderContent()}
                </Grid>
            </Grid>
            <EditAccount 
                editOpen={editOpen} 
                setEditOpen={setEditOpen} 
            />
        </div>
    );
};

export default MainContent;
