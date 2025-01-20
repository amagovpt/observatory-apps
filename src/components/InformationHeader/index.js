import React from "react";
import "./style.css";

const InformationHeader = ({ darkTheme, infos, infosTitles, title, subtitle, latestEvaluation }) => {

    // Theme
    const theme = darkTheme === "dark" ? "dark" : ""

    // Present information
    const presentInfo = (value, subtitle, index) => {
        return (
            <div key={index} className="d-flex flex-column margin_mobile">
                <span className="ama-typography-body">{subtitle}</span>
                <h3 className="bold">{value}</h3>
            </div>
        )
    }

    return (
        <div className={`${theme} ama d-flex flex-column section_container py-4 m-0`}>
            {/* Web version */}
            <div className="grid_container">
                <div className="d-flex flex-column mb-3">
                    <h2 className="bold">{title}</h2>
                    <span className="ama-typography-body">{subtitle}</span>
                </div>
                <div className="mb-3 second_column ps-4">
                    <div className="d-flex flex-column">
                        <span className="ama-typography-body bold mb-1">{latestEvaluation}</span>
                        <span className="ama-typography-body">{infos.latestEvaluation}</span>
                    </div>
                </div>
            </div>
            <div className={`last_column px-3 flex-column`}>
                    <div className="d-flex justify-content-around w-100 py-4 first">
                        {infos.infosTable.map((info, index) => {
                            return index < 1 ? presentInfo(info, infosTitles[index], index) : null
                        })}
                    </div>
                    <div className="d-flex justify-content-around w-100 align-items-center py-4">
                        {infos.infosTable.map((info, index) => {
                            return index >= 1 ? presentInfo(info, infosTitles[index], index) : null
                        })}
                    </div>
                </div>

            {/* Mobile version */}
            <div className="grid_container_mobile">
                <div className="d-flex flex-column row my-3">
                    <h2 className="bold">{title}</h2>
                    <span className="ama-typography-body">{subtitle}</span>
                </div>
                <div className="row d-flex flex-column mb-4">
                    <div className="d-flex flex-column mb-2">
                        <span className="ama-typography-body bold mb-1">{latestEvaluation}</span>
                        <span className="ama-typography-body">{infos.latestEvaluation}</span>
                    </div>
                </div>
                <div className="row fourth_row">
                    {infos.infosTable.map((info, index) => {
                        return presentInfo(info, infosTitles[index], index)
                    })}
                </div>
            </div>
        </div>
    );
};

export { InformationHeader };
