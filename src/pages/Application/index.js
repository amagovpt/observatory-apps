import "./styles.css";

// Api
import { getObservatoryData } from "../../config/api";

// Hooks
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Contexts
import { ThemeContext } from "../../context/ThemeContext";

// Date formatting
import moment from 'moment'

// Components
import { Breadcrumb, Tabs, LoadingComponent } from "ama-design-system";

// Local Components
import { InformationHeader } from "../../components/InformationHeader";
import { GlobalHeader } from "../../components/GlobalHeader";
import { SortingTable } from "../../components/SortingTable";
import { GoodBadTab } from "./_components/goodBadTab";

// Extra Data / Functions
import { checkIfDirectoryOk, checkIfApplicationOk, getStatsTitles, getStatsTable } from "./utils"

import { pathURL } from "../../App";

export default function Application() {

  const { t, i18n: {language} } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState();

  // Theme
  const { theme } = useContext(ThemeContext);
  const main_content_application = theme === "light" ? "" : "main_content_application";

  // Loading
  const [loading, setLoading] = useState(false);

  const [parsedData, setParsedData] = useState();

  // Navigation Parameters
  const splitLocation = location.pathname.split("/")
  while (splitLocation.length && splitLocation[splitLocation.length - 1] === "") {
    splitLocation.pop();
  }
  const id = Number(splitLocation[splitLocation.length-2]) || null;
  const sitioId = Number(splitLocation[splitLocation.length-1]) || null;

  // Information Panel Data
  const [info, setInfo] = useState({
    name: "",
    ownerEntity: "",
    downloadUrl: "",
    operatingSystem: "",
    latestRevision: ""
  });

  // Global Panel Data
  const [global, setGlobal] = useState({
    accessibilityDeclaration: {
      declaration: "",
      state: "",
      date: ""
    },
    usabilityAccessibilityStamp: {
      stamp: "",
      stampLevel: "",
      validityDate: ""
    },
    conformance: "0"
  });

  const [directoryName, setDirectoryName] = useState("Unknown");

  // Sections Titles 
  const infosTitles = [t("APPLICATION.owner_entity"), t("APPLICATION.download_url"), t("APPLICATION.operating_system")];
  const statsTitles = getStatsTitles(t, global);

  // Stats Data
  const {threshold, statsTable} = getStatsTable(t, global, moment, pathURL);

  // Navigation options
  const breadcrumbs = [
    {
      title: "Acessibilidade.gov.pt",
      href: "https://www.acessibilidade.gov.pt/",
    },
    { title: t("HEADER.NAV.observatory"), href: "", onClick: () => navigate(`${pathURL}`) },
    { title: t("HEADER.NAV.directories"), href: "", onClick: () => navigate(`${pathURL}directories`) },
    { title: directoryName, href: "", onClick: () => navigate(`${pathURL}directories/${id}`) },
    { title: info && info.name },
  ];

  // Ten Critical Aspects Table List
  const [tenCriticalAspectsList, setTenCriticalAspectsList] = useState([]);
  const tenCriticalAspectsTableHeaders = [
    {type: "Text", name: t("APPLICATION.tables.classification"), property: "rank"},
    {type: "Text", bigWidth: "50%", name: t("APPLICATION.tables.critical_aspect"), property: "name"},
    {type: "Icon", name: "AMA-Check-Line", description: t("APPLICATION.ten_critical_aspects_table.note"), property: "conformity", justifyCenter: true},
    {type: "Text", name: t("APPLICATION.tables.evidences"), property: "nEvidences", justifyCenter: true}
  ];

  // Success Criteria Table List
  const [successCriteriaList, setSuccessCriteriaList] = useState([]);
  const successCriteriaTableHeaders = [
    {type: "Text", name: t("APPLICATION.tables.classification"), property: "rank"},
    {type: "Text", bigWidth: "50%", name: t("APPLICATION.tables.success_criteria"), property: "name"},
    {type: "Icon", name: "AMA-Check-Line", description: t("APPLICATION.success_criteria_table.note"), property: "conformity", justifyCenter: true},
    {type: "Text", name: t("APPLICATION.tables.evidences"), property: "nEvidences", justifyCenter: true}
  ];

  // Common To Both Tables
  const columnsOptions = {
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    conformity: { type: "Conformance", center: true, bold: false, decimalPlace: false },
    nEvidences: { type: "Number", center: true, bold: false, decimalPlace: false }
  };
  const iconsAltText = [
    t("APPLICATION.tables.compliant"), 
    t("APPLICATION.tables.not_compliant"), 
    t("APPLICATION.tables.not_applicable")
  ];

  // Tabs
  const tabsTableHeaders = [
    {type: "Text", name: t("APPLICATION.tables.classification"), property: "rank"},
    {type: "Text", name: t("APPLICATION.tables.critical_aspect"), property: "name"},
    {type: "Text", name: t("APPLICATION.tables.evidences"), property: "nEvidences"}
  ];
  const tabsColumnOptions = {
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    nEvidences: { type: "Number", center: false, bold: false, decimalPlace: false }
  };
  const [top3BestPracticesList, setTop3BestPracticesList] = useState([]);
  const [top3WorstPracticesList, setTop3WorstPracticesList] = useState([]);
  const tabsGoodBad = [
    {
      eventKey: "tab1",
      title: t("APPLICATION.tabs.best_practices"),
      component:
        <GoodBadTab
          main_content_application={main_content_application}
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
          main_content_application={main_content_application}
          columnsOptions={tabsColumnOptions}
          tableHeaders={tabsTableHeaders}
          table={top3WorstPracticesList}
          goodOrBad={"top_3_worst_practices"}
        />,
    },
  ];

  useEffect(() => {
    const processData = async () => {
      setLoading(true)
      const {response, err} = await getObservatoryData();

      if(err && err.code) {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if(!checkIfDirectoryOk(id, response.data?.result)) {
        setError(t("MISC.directory_error"));
      } else if(!checkIfApplicationOk(id, sitioId, response.data?.result)) {
        setError(t("MISC.application_error"));
      } else {
        localStorage.setItem("observatorioData", JSON.stringify(response.data?.result));
        const tempData = response.data?.result.directories[id]
        setDirectoryName(tempData.name)
        const tempData2 = tempData.applications[sitioId]
        setInfo(tempData2)
        setGlobal(tempData2)
        setTenCriticalAspectsList(tempData2.tenCriticalAspectsList)
        setSuccessCriteriaList(tempData2.successCriteriaList)
        setTop3BestPracticesList(tempData2.top3BestPracticesList)
        setTop3WorstPracticesList(tempData2.top3WorstPracticesList)
      }
      setLoading(false)
    }

    const storedData = localStorage.getItem("observatorioData");
    if(!storedData) {
      processData()
    } else {
      const parsedData = JSON.parse(storedData)
      setParsedData(parsedData)
      setDirectoryName(parsedData.directories[id].name)
      const tempData = parsedData.directories[id].applications[sitioId]
      setInfo(tempData)
      setGlobal(tempData)
      setTenCriticalAspectsList(tempData.tenCriticalAspectsList)
      setSuccessCriteriaList(tempData.successCriteriaList)
      setTop3BestPracticesList(tempData.top3BestPracticesList)
      setTop3WorstPracticesList(tempData.top3WorstPracticesList)
    }
  }, []);

  return (
    <>
      {!loading ? 
        !error ?
          <div className="container application">
            <div className="link_breadcrumb_container py-5">
              <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t("HEADER.NAV.youAreHere")} />
            </div>

            <div className={`title_container ${main_content_application}`}>
              <div className="ama-typography-body-large bold observatorio px-3 mb-2">
                {directoryName}
              </div>
              <h1 className="bold my-2">{info && info.name}</h1>
            </div>

            {/* Information Header Component */}
            <section className={`bg-white ${main_content_application} d-flex flex-row justify-content-center align-items-center my-5`}>
              {<InformationHeader
                darkTheme={theme}
                infos={{
                  latestEvaluation: moment(info.latestRevision).format("LL"),
                  infosTable: [info.ownerEntity, info.downloadUrl, info.operatingSystem]
                }}
                infosTitles={infosTitles}
                title={t("APPLICATION.info_title")}
                latestEvaluation={t("APPLICATION.latest_revision")}
              />}
            </section>

            {/* Global Header Component */}
            <section className={`bg-white ${main_content_application} d-flex flex-row justify-content-center align-items-center my-5`}>
              <GlobalHeader
                darkTheme={theme}
                stats={{
                  score: global.conformance,
                  statsTable: statsTable
                }}
                threshold={threshold}
                statsTitles={statsTitles}
                firstRowTitle={t("APPLICATION.accessibility_declaration.title")}
                secondRowTitle={t("APPLICATION.usability_accessibility_stamp.title")}
                title={t("APPLICATION.global_statistics_title")}
                subtitle={t("APPLICATION.global_statistics_subtitle")}
                gaugeTitle={[t("APPLICATION.conformance_level.1"), t("APPLICATION.conformance_level.2"), t("APPLICATION.conformance_level.3")]}
                gaugeDescription={t("APPLICATION.conformance_level.description")}
              />
            </section>

            {/* Map of the “10 critical aspects” */}
            <section className={`bg-white ${main_content_application} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 m-0 application_container">
                <h2 className="bold pb-3 m-0">{t("APPLICATION.ten_critical_aspects_table.title")}</h2>
                <SortingTable
                  darkTheme={theme}
                  hasSort={false}
                  headers={tenCriticalAspectsTableHeaders}
                  setDataList={setTenCriticalAspectsList}
                  dataList={tenCriticalAspectsList}
                  caption={t("APPLICATION.ten_critical_aspects_table.title")}
                  columnsOptions={columnsOptions}
                  iconsAltTexts={iconsAltText}
                  pagination={false}
                  project={pathURL}
                />
              </div>
            </section>

            {/* Map of the success criteria */}
            <section className={`bg-white ${main_content_application} d-flex flex-row justify-content-center align-items-center my-5`}>
              <div className="d-flex flex-column section_container py-4 m-0 application_container">
                <h2 className="bold pb-3 m-0">{t("APPLICATION.success_criteria_table.title")}</h2>
                <SortingTable
                  darkTheme={theme}
                  hasSort={false}
                  headers={successCriteriaTableHeaders}
                  setDataList={setSuccessCriteriaList}
                  dataList={successCriteriaList}
                  caption={t("APPLICATION.success_criteria_table.title")}
                  columnsOptions={columnsOptions}
                  iconsAltTexts={iconsAltText}
                  pagination={false}
                  project={pathURL}
                />
              </div>
            </section>

            {/* Good / Bad section */}
            <div className="good_bad">
              <Tabs tabs={tabsGoodBad} defaultActiveKey="tab1" vertical={false} />
            </div>
          </div>
        : <section className={`${main_content_application} d-flex flex-column align-items-center py-5 welcome_section`}>
            <h2 className="text-center w-50">{error}</h2>
          </section>
      : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
    </>
  );
}