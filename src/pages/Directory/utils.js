import { pathURL } from "../../App";

export function checkIfDirectoryOk (id, array) {
  const idObejct = array.directoriesList.find(e => e.id === id)
  return idObejct ? true : false;
}

export function createStats(data) {
  return {
    "avgConformance": data.avgConformance,
    "maxConformance": data.maxConformance,
    "minConformance": data.minConformance,
    "nApplications": data.nApplications,
    "nApplicationsWithGoldUsabilityAccessibilityStamp": data.nApplicationsWithGoldUsabilityAccessibilityStamp,
    "nApplicationsWithSilverUsabilityAccessibilityStamp": data.nApplicationsWithSilverUsabilityAccessibilityStamp,
    "nApplicationsWithBronzeUsabilityAccessibilityStamp": data.nApplicationsWithBronzeUsabilityAccessibilityStamp,
    "nApplicationsWithAccessibilityDeclaration": data.nApplicationsWithAccessibilityDeclaration,
    "nApplicationsWithCompliantAccessibilityDeclaration": data.nApplicationsWithCompliantAccessibilityDeclaration,
    "nApplicationsWithPartiallyCompliantAccessibilityDeclaration": data.nApplicationsWithPartiallyCompliantAccessibilityDeclaration,
    "nApplicationsWithNonCompliantAccessibilityDeclaration": data.nApplicationsWithNonCompliantAccessibilityDeclaration
  }
}

export function getStatsTable(stats) {
  return [
    stats.nApplications,
    stats.nApplicationsWithGoldUsabilityAccessibilityStamp,
    stats.nApplicationsWithSilverUsabilityAccessibilityStamp,
    stats.nApplicationsWithBronzeUsabilityAccessibilityStamp,
    stats.nApplicationsWithAccessibilityDeclaration,
    stats.nApplicationsWithCompliantAccessibilityDeclaration,
    stats.nApplicationsWithPartiallyCompliantAccessibilityDeclaration,
    stats.nApplicationsWithNonCompliantAccessibilityDeclaration
  ];
}

export function getTenCriticalAspectsTable(t, id) {
  const tenCriticalAspectsHeaders = [
    [
      {type: "Text", nRow: 2, bigWidth: "5%", name: t("DIRECTORY.table.rank"), property: "rank"},
      {type: "Text", nRow: 2, bigWidth: "50%", name: t("DIRECTORY.table.critical_aspect"), property: "name"},
      {id: "compliant", type: "Text", name: t("DIRECTORY.table.compliant"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
      {id: "nonCompliant", type: "Text", name: t("DIRECTORY.table.non_compliant"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
      {id: "nonApplicable", type: "Text", name: t("DIRECTORY.table.non_applicable"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
    ],
    [
      {id: "cTotal", type: "Text", bigWidth: "7%", name: t("DIRECTORY.table.total"), property: "compliantTotal", justifyCenter: true},
      {id: "cPercentage", type: "Text", bigWidth: "8%", name: t("DIRECTORY.table.percentage"), property: "compliantPercentage", justifyCenter: true},
    ],
    [
      {id: "ncTotal", type: "Text", bigWidth: "7%", name: t("DIRECTORY.table.total"), property: "nonCompliantTotal", justifyCenter: true},
      {id: "ncPercentage", type: "Text", bigWidth: "8%", name: t("DIRECTORY.table.percentage"), property: "nonCompliantPercentage", justifyCenter: true},
    ],
    [
      {id: "naTotal", type: "Text", bigWidth: "7%", name: t("DIRECTORY.table.total"), property: "nonApplicableTotal", justifyCenter: true},
      {id: "naPercentage", type: "Text", bigWidth: "8%", name: t("DIRECTORY.table.percentage"), property: "nonApplicablePercentage", justifyCenter: true},
    ]
  ]

  const tenCriticalAspectsColumnsOptions = {
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    compliantTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "compliant cTotal" },
    compliantPercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "compliant cPercentage" },
    nonCompliantTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "nonCompliant ncTotal" },
    nonCompliantPercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "nonCompliant ncPercentage" },
    nonApplicableTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "nonApplicable naTotal" },
    nonApplicablePercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "nonApplicable naPercentage" },
  }

  return { tenCriticalAspectsHeaders, tenCriticalAspectsColumnsOptions };
}

export function getSuccessCriteriaTable(t, id) {
  const successCriteriaHeaders = [
    [
      {type: "Text", nRow: 2, bigWidth: "5%", name: t("DIRECTORY.table.rank"), property: "rank"},
      {type: "Text", nRow: 2, bigWidth: "50%", name: t("DIRECTORY.table.success_criteria"), property: "name"},
      {id: "compliant", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.compliant"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
      {id: "nonCompliant", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.non_compliant"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
      {id: "nonApplicable", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.non_applicable"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
    ],
    [
      {id: "cTotal", type: "Text", bigWidth: "7%", name: t("DIRECTORY.table.total"), property: "compliantTotal", justifyCenter: true},
      {id: "cPercentage", type: "Text", bigWidth: "8%", name: t("DIRECTORY.table.percentage"), property: "compliantPercentage", justifyCenter: true},
    ],
    [
      {id: "ncTotal", type: "Text", bigWidth: "7%", name: t("DIRECTORY.table.total"), property: "nonCompliantTotal", justifyCenter: true},
      {id: "ncPercentage", type: "Text", bigWidth: "8%", name: t("DIRECTORY.table.percentage"), property: "nonCompliantPercentage", justifyCenter: true},
    ],
    [
      {id: "naTotal", type: "Text", bigWidth: "7%", name: t("DIRECTORY.table.total"), property: "nonApplicableTotal", justifyCenter: true},
      {id: "naPercentage", type: "Text", bigWidth: "8%", name: t("DIRECTORY.table.percentage"), property: "nonApplicablePercentage", justifyCenter: true},
    ]
  ]

  const successCriteriaColumnsOptions = {
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    compliantTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "compliant cTotal" },
    compliantPercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "compliant cPercentage" },
    nonCompliantTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "nonCompliant ncTotal" },
    nonCompliantPercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "nonCompliant ncPercentage" },
    nonApplicableTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "nonApplicable naTotal" },
    nonApplicablePercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "nonApplicable naPercentage" },
  }

  return { successCriteriaHeaders, successCriteriaColumnsOptions };
}

export function getTop5ApplicationsTable(t, id) {
  const top5ApplicationsHeaders = [
    [
      {type: "Text", bigWidth: "10%", name: t("DIRECTORY.table.rank"), property: "rank"},
      {type: "Text", bigWidth: "50%", name: t("DIRECTORY.table.application"), property: "name"},
      {type: "Text", name: t("DIRECTORY.table.conformance"), property: "conformance"},
    ]
  ]

  const top5ApplicationsColumnsOptions = {
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
      return `${pathURL}directories/${id}/${row.id}`
    }},
    conformance: { type: "Number", center: true, bold: false, decimalPlace: false }
  }

  return { top5ApplicationsHeaders, top5ApplicationsColumnsOptions };
}