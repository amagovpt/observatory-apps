import "./styles.css";

// Api
import { getObservatoryData } from "../../config/api";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Date formatting
import moment from 'moment'

// Contexts
import { ThemeContext } from "../../context/ThemeContext";

// Components
import { SortingTable, Breadcrumb, LoadingComponent, Tabs } from "ama-design-system";

// Extra Components
import { GlobalStatisticsHeader } from "../../components/GlobalStatisticsHeader";
import { GoodBadTab } from "./_components/goodBadTab";

// Extra Data / Functions
import {
  createStats,
  getApplicationsWithAccessibilityDeclarationTable,
  getApplicationsWithUsabilityAndAccessibilityStampTable,
  getDirectoryTable, 
  getStatsTable, 
  getSuccessCriteriaTable, 
  getTenCriticalAspectsTable, 
  getTop5ApplicationsTable 
} from "./utils";

import { pathURL } from "../../App";

export default function Directories() {
  const { t, i18n: {language} } = useTranslation();
  const navigate = useNavigate();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_directories = theme === "light" ? "" : "main_content_directories";

  const [error, setError] = useState();

  const [parsedData, setParsedData] = useState();
  
  // Data for the GlobalStatisticsHeader component
  const [stats, setStats] = useState({
    avgConformance: 0,
    maxConformance: 0,
    minConformance: 0,
    nApplications: 0,
    nApplicationsWithGoldUsabilityAccessibilityStamp: 0,
    nApplicationsWithSilverUsabilityAccessibilityStamp: 0,
    nApplicationsWithBronzeUsabilityAccessibilityStamp: 0,
    nApplicationsWithAccessibilityDeclaration: 0,
    nApplicationsWithCompliantAccessibilityDeclaration: 0,
    nApplicationsWithPartiallyCompliantAccessibilityDeclaration: 0,
    nApplicationsWithNonCompliantAccessibilityDeclaration: 0
  });

  console.log(stats);

  const statsTitles = [
    t("STATISTICS.applications"),
    t("STATISTICS.stamp.gold"),
    t("STATISTICS.stamp.silver"),
    t("STATISTICS.stamp.bronze"),
    t("STATISTICS.declaration.total"),
    t("STATISTICS.declaration.conform"),
    t("STATISTICS.declaration.partially_conform"),
    t("STATISTICS.declaration.non_conform")
  ];
  const statsTable = getStatsTable(stats);

  // Data for the Directories Table
  const { directoriesHeaders, columnsOptions, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText } = getDirectoryTable(t);
  const [directoriesList, setDirectoriesList] = useState([]);

  // Data for Ten Critical Aspects Table
  const { tenCriticalAspectsHeaders, tenCriticalAspectsColumnsOptions } = getTenCriticalAspectsTable(t);
  const [tenCriticalAspectsList, setTenCriticalAspectsList] = useState([]);

  // Data for Success Criteria Table
  const { successCriteriaHeaders, successCriteriaColumnsOptions } = getSuccessCriteriaTable(t);
  const [successCriteriaList, setSuccessCriteriaList] = useState([]);

  // Tabs for 3 Best / Worst Critical Aspects
  const tabsTableHeaders = [
    {type: "Text", name: t("DIRECTORY.table.rank"), property: "rank"},
    {type: "Text", name: t("DIRECTORY.table.critical_aspect"), property: "name"},
    {type: "Text", name: t("DIRECTORY.table.applications"), property: "nApplications"}
  ];
  const tabsColumnOptions = {
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    nApplications: { type: "Number", center: true, bold: false, decimalPlace: false }
  };
  const [top3BestPracticesList, setTop3BestPracticesList] = useState([]);
  const [top3WorstPracticesList, setTop3WorstPracticesList] = useState([]);
  const tabsGoodBad = [
    {
      eventKey: "tab1",
      title: t("APPLICATION.tabs.best_practices"),
      component:
        <GoodBadTab
          main_content_directories={main_content_directories}
          columnsOptions={tabsColumnOptions}
          tableHeaders={tabsTableHeaders}
          table={top3BestPracticesList}
          goodOrBad={"top_3_best_practices"}
        />,
    },
    {
      eventKey: "tab2",
      title: t("APPLICATION.tabs.worst_practices"),
      component:
        <GoodBadTab
          main_content_directories={main_content_directories}
          columnsOptions={tabsColumnOptions}
          tableHeaders={tabsTableHeaders}
          table={top3WorstPracticesList}
          goodOrBad={"top_3_worst_practices"}
        />,
    },
  ];

  // Data for Top 5 Applications Table
  const { top5ApplicationsHeaders, top5ApplicationsColumnsOptions } = getTop5ApplicationsTable(t);
  const [top5Applications, setTop5Applications] = useState([]);

  // Data for Applications With Accessibility Declaration Table
  const { applicationsWithAccessibilityDeclarationHeaders, applicationsWithAccessibilityDeclarationColumnsOptions, applicationsWithAccessibilityDeclarationNameOfIcons } = getApplicationsWithAccessibilityDeclarationTable(t);
  const [applicationsWithAccessibilityDeclarationList, setApplicationsWithAccessibilityDeclarationList] = useState([]);

  // Data for Applications With Usability And Accessibility Stamp Table
  const { applicationsWithUsabilityAndAccessibilityStampHeaders, applicationsWithUsabilityAndAccessibilityStampColumnsOptions, applicationsWithUsabilityAndAccessibilityStampNameOfIcons } = getApplicationsWithUsabilityAndAccessibilityStampTable(t);
  const [applicationsWithUsabilityAndAccessibilityStampList, setApplicationsWithUsabilityAndAccessibilityStampList] = useState([]);

  // Loading
  const [loading, setLoading] = useState(false);
  
  // Navigation options
  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "", onClick: () => navigate(`${pathURL}`) },
    { title: t("HEADER.NAV.directories"), href: "", onClick: () => navigate(`${pathURL}directories`) },
  ];

  useEffect(() => {
    const processData = async () => {
      setLoading(true)
      const {response, err} = await getObservatoryData();

      if(err && err.code) {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else {
        const tempData = response.data?.result;
        localStorage.setItem("observatorioData", JSON.stringify(response.data?.result));
        setStats(createStats(tempData));
        setDirectoriesList(tempData.directoriesList);
        setTenCriticalAspectsList(tempData.tenCriticalAspectsList);
        setSuccessCriteriaList(tempData.successCriteriaList);
        setTop3BestPracticesList(tempData.top3BestPracticesList);
        setTop3WorstPracticesList(tempData.top3WorstPracticesList);
        setTop5Applications(tempData.top5Applications);
        setApplicationsWithAccessibilityDeclarationList(tempData.accessibilityDeclarationApplicationsList);
        setApplicationsWithUsabilityAndAccessibilityStampList(tempData.usabilityAccessibilityStampApplicationsList);
      }
      setLoading(false)
    }

    const storedData = localStorage.getItem("observatorioData");
    if(!storedData) {
      processData()
    } else {
      const parsedData = JSON.parse(storedData)
      setParsedData(parsedData)
      setStats(createStats(parsedData));
      setDirectoriesList(parsedData.directoriesList);
      setTenCriticalAspectsList(parsedData.tenCriticalAspectsList);
      setSuccessCriteriaList(parsedData.successCriteriaList);
      setTop3BestPracticesList(parsedData.top3BestPracticesList);
      setTop3WorstPracticesList(parsedData.top3WorstPracticesList);
      setTop5Applications(parsedData.top5Applications);
      setApplicationsWithAccessibilityDeclarationList(parsedData.accessibilityDeclarationApplicationsList);
      setApplicationsWithUsabilityAndAccessibilityStampList(parsedData.usabilityAccessibilityStampApplicationsList);
    }
  }, [])

  return (
    <>
      {!loading ? 
        !error ?
          <div className="container">
            <div className="link_breadcrumb_container py-5">
              <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t("HEADER.NAV.youAreHere")} />
            </div>

            <div className="title_container">
              <div className="ama-typography-body-large bold observatorio px-3">
                  {t("HEADER.NAV.observatory")}
              </div>
              <h1 className="bold my-2">{t("HEADER.NAV.directories")}</h1>
            </div>

            {/* Global Statistics Header Component */}
            <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
              <GlobalStatisticsHeader
                darkTheme={theme}
                stats={{
                  avgConformance: stats.avgConformance,
                  maxConformance: stats.maxConformance,
                  minConformance: stats.minConformance,
                  statsTable: statsTable
                }}
                statsTitles={statsTitles}
                title={t("DIRECTORIES.statistics_title")}
                subtitle={t("DIRECTORIES.statistics_subtitle")}
                maxConformance={t("STATISTICS.max_conformance")}
                minConformance={t("STATISTICS.min_conformance")}
                gaugeTitle={[t("STATISTICS.gauge.label")]}
                gaugeDescription={t("STATISTICS.gauge.description", {value: (stats.avgConformance * 10)})}
              />
            </section>

            {/* MAIN TABLE */}
            <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 directory_container">
                <h2 className="bold m-0">{t("DIRECTORIES.table.title")}</h2>
                <p className="ama-typography-body mb-4">{t("DIRECTORIES.table.subtitle")}</p>
                <SortingTable
                  darkTheme={theme}
                  hasSort={false}
                  headers={directoriesHeaders}
                  setDataList={setDirectoriesList}
                  dataList={directoriesList}
                  columnsOptions={columnsOptions}
                  caption={t("DIRECTORIES.table.subtitle")}
                  project={`${pathURL}`}
                  pagination={true}
                  itemsPaginationTexts={itemsPaginationText}
                  nItemsPerPageTexts={nItemsPerPageText}
                  paginationButtonsTexts={paginationButtonsTexts}
                />

                <div className="ama-typography-body mt-4">{t("DIRECTORY.table.note")}</div>
              </div>
            </section>

            {/* Map of the “10 critical aspects” -- Add graph representation */}
            <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 directory_container">
                <h2 className="bold mb-4">{t("APPLICATION.ten_critical_aspects_table.title")}</h2>
                <SortingTable
                  darkTheme={theme}
                  hasSort={false}
                  headers={tenCriticalAspectsHeaders}
                  setDataList={setTenCriticalAspectsList}
                  dataList={tenCriticalAspectsList}
                  caption={t("APPLICATION.ten_critical_aspects_table.title")}
                  columnsOptions={tenCriticalAspectsColumnsOptions}
                  pagination={false}
                  project={pathURL}
                />
              </div>
            </section>

            {/* Map of the success criteria -- Add graph representation */}
            <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 directory_container">
                <h2 className="bold mb-4">{t("APPLICATION.success_criteria_table.title")}</h2>
                <SortingTable
                  darkTheme={theme}
                  hasSort={false}
                  headers={successCriteriaHeaders}
                  setDataList={setSuccessCriteriaList}
                  dataList={successCriteriaList}
                  caption={t("APPLICATION.success_criteria_table.title")}
                  columnsOptions={successCriteriaColumnsOptions}
                  pagination={false}
                  project={pathURL}
                />
              </div>
            </section>

            {/* Good / Bad section */}
            <div className="good_bad">
              <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={false} />
            </div>

            {/* Top 5 Applications Table */}
            <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 directory_container">
                <h2 className="bold mb-4">{t("DIRECTORY.top_five_applications")}</h2>
                <SortingTable
                  darkTheme={theme}
                  hasSort={false}
                  headers={top5ApplicationsHeaders}
                  setDataList={setTop5Applications}
                  dataList={top5Applications}
                  caption={t("DIRECTORY.top_five_applications")}
                  columnsOptions={top5ApplicationsColumnsOptions}
                  pagination={false}
                  project={pathURL}
                />

                <div className="ama-typography-body mt-4">{t("DIRECTORY.table.note")}</div>
              </div>
            </section>

            {/* List of applications with accessibility declaration */}
            <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 directory_container">
                <h2 className="bold mb-4">{t("DIRECTORY.table.applications_with_declaration")}</h2>
                <SortingTable
                  darkTheme={theme}
                  hasSort={false}
                  headers={applicationsWithAccessibilityDeclarationHeaders}
                  setDataList={setApplicationsWithAccessibilityDeclarationList}
                  dataList={applicationsWithAccessibilityDeclarationList}
                  caption={t("DIRECTORY.table.applications_with_declaration")}
                  columnsOptions={applicationsWithAccessibilityDeclarationColumnsOptions}
                  pagination={false}
                  project={pathURL}
                  iconsAltTexts={applicationsWithAccessibilityDeclarationNameOfIcons}
                />
              </div>
            </section>

            {/* List of applications with usability and accessibility stamp */}
            <section className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 directory_container">
                <h2 className="bold mb-4">{t("DIRECTORY.table.applications_with_stamp")}</h2>
                <SortingTable
                  darkTheme={theme}
                  hasSort={false}
                  headers={applicationsWithUsabilityAndAccessibilityStampHeaders}
                  setDataList={setApplicationsWithUsabilityAndAccessibilityStampList}
                  dataList={applicationsWithUsabilityAndAccessibilityStampList}
                  caption={t("DIRECTORY.table.applications_with_stamp")}
                  columnsOptions={applicationsWithUsabilityAndAccessibilityStampColumnsOptions}
                  pagination={false}
                  project={pathURL}
                  iconsAltTexts={applicationsWithUsabilityAndAccessibilityStampNameOfIcons}
                />
              </div>
            </section>
          </div>
        : <section className={`${main_content_directories} d-flex flex-column align-items-center py-5 welcome_section`}>
            <h2 className="text-center w-50">{error}</h2>
          </section>
      : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
    </>
  );
}