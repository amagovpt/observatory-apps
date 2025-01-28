// Hooks
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

// Components
import { Tabs, SortingTable } from "ama-design-system";

// Extra Data / Functions
import { getGraphs } from "../utils";

import { pathURL } from "../../../App";

// Chart Lib
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, registerables as registerablesJS } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerablesJS);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
);

export function GraphTableTabs({ nApplications, dataList, setDataList, headers, options, caption }) {

  const { t, i18n: { language } } = useTranslation();

  // Data for graph
  const [dataForBar, setDataForBar] = useState();
  const [dataForLine, setDataForLine] = useState();

  // Theme
  const { theme } = useContext(ThemeContext);

  // Graph
  const graphs = getGraphs(t, dataList, dataForBar, dataForLine, nApplications, theme);

  const tabs = [
    {
      eventKey: "tab1",
      title: t("DIALOGS.scores.charts_title"),
      component:
      <div className="overflow">
        <div className="barLineContainer">
          {graphs && graphs.length > 0 && graphs.map((value, index) => {
            return (
              <>
                <h4 className="bold">{value.name}</h4>
                <Bar className="mb-4" key={`graph_${index}`} data={value.graphData} options={value.graphOptions} aria-label={value.name} />
              </>
            );
          })}
        </div>
      </div>
    },
    {
      eventKey: "tab2",
      title: t("DIALOGS.scores.table"),
      component: 
      <div>
        <SortingTable
            darkTheme={theme}
            hasSort={false}
            headers={headers}
            setDataList={setDataList}
            dataList={dataList}
            caption={caption}
            columnsOptions={options}
            pagination={false}
            project={pathURL}
        />
      </div>
    },
  ];

  useEffect(() => {
    let tempDataForBar = [];
    let tempDataForLine = [];
    dataList && dataList.length > 0 && dataList.map((elem) => {
      const percentages = [
        Number(elem.compliantPercentage.substr(0, elem.compliantPercentage.length - 1)),
        Number(elem.nonCompliantPercentage.substr(0, elem.nonCompliantPercentage.length - 1)),
        Number(elem.nonApplicablePercentage.substr(0, elem.nonApplicablePercentage.length - 1))
      ];
      tempDataForBar.push(percentages);

      const cumulativePercentages = percentages.map((value, index) => {
        if (index == 0) {
          return value.toFixed(0);
        } else {
          let res = value;
          index--;
          while (index != -1) {
            res += percentages[index];
            index--;
          }
          return res.toFixed(0);
        }
      });
      tempDataForLine.push(cumulativePercentages);
    });

    console.log(tempDataForBar);
    console.log(tempDataForLine);

    setDataForBar(tempDataForBar);
    setDataForLine(tempDataForLine);

  }, [dataList, language, theme]);

  return (
    <div className="BarLine_section tabs_section">
      <Tabs tabs={tabs} defaultActiveKey="tab1" vertical={false} />
    </div>
  );
}
