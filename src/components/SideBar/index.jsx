import React from "react";
import DashboardIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SideBar = ({ onSelect, selected }) => {
    return (
        <div className="sidebar">
            <h4 className="menu-title">MENU</h4>
            <ul className="menu-list">
                <li className={`menu-item ${selected === "dashboard" ? "active" : ""}`} onClick={() => onSelect("dashboard")}>
                    <DashboardIcon className="icon" />
                    <span>Dashboard</span>
                </li>
                <li className={`menu-item ${selected === "exercise" ? "active" : ""}`} onClick={() => onSelect("exercise")}>
                    <DescriptionIcon className="icon" />
                    <span>Begin Exercise</span>
                </li>
                <li className={`menu-item ${selected === "accounts" ? "active" : ""}`} onClick={() => onSelect("accounts")}>
                    <AccountCircleIcon className="icon" />
                    <span>Accounts</span>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
