import React from "react";
import "./style.css";

import { Gauge } from "ama-design-system";

const GlobalHeader = ({ darkTheme, stats, statsTitles, title, subtitle, firstRowTitle, secondRowTitle, threshold, gaugeTitle, gaugeDescription }) => {

    // Theme
    const theme = darkTheme === "dark" ? "dark" : ""

    // Normal stats with Value (Title) and description (Subtitle)
    const normalExtraStats = (value, subtitle, index) => {
        return (
            <div key={index} className="d-flex flex-column margin_mobile">
                {value}
                <span className="ama-typography-body">{subtitle}</span>
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
                <div className="mb-3 second_column ps-4" />
                <div className="second_row">
                    <Gauge percentage={stats.score} title={gaugeTitle} darkTheme={darkTheme} screenReaderTitle={gaugeDescription} type={"100"} />
                </div>
                <div className={"last_column px-3 flex-column"}>
                    <h3 className="bold">{firstRowTitle}</h3>
                    <div className="d-flex justify-content-around w-100 align-items-center py-4 first">
                        {stats.statsTable.map((stat, index) => {
                            return index < threshold ? normalExtraStats(stat, statsTitles[index], index) : null
                        })}
                    </div>
                    <h3 className="bold">{secondRowTitle}</h3>
                    <div className="d-flex justify-content-around w-100 align-items-center py-4">
                        {stats.statsTable.map((stat, index) => {
                            return index >= threshold ? normalExtraStats(stat, statsTitles[index], index) : null
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile version */}
            <div className="grid_container_mobile">
                <div className="d-flex flex-column row my-3">
                    <h2 className="bold">{title}</h2>
                    <span className="ama-typography-body">{subtitle}</span>
                </div>
                <div className="row second_row mb-4">
                    <Gauge percentage={stats.score} title={gaugeTitle} screenReaderTitle={gaugeDescription} type={"100"} />
                </div>
                <div className="row fourth_row">
                    {stats.statsTable.map((stat, index) => {
                        return normalExtraStats(stat, statsTitles[index], index)
                    })}
                </div>
            </div>
        </div>
    );
};

export { GlobalHeader };
