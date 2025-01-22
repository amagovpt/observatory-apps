import { pathURL } from "../../App";

// Function to get additional Arrays
// t -> the translation function
// RETURNS
// directoriesHeaders -> Headers for the main table
// columnsOptions -> Options to tell the type to render with which property for main table
// statsTitles -> Titles for the StatisticsHeader component
// nameOfIcons -> Name of icons to be showned in the table
export function getDirectoryTable (t, id) {
  const directoriesHeaders = [
    [
      {type: "SortingText", bigWidth: "10%", name: t("DIRECTORY.table.rank"), property: "rank"},
      {type: "SortingText", bigWidth: "50%", name: t("DIRECTORY.table.application"), property: "name"},
      {type: "SortingIcon", bigWidth: "10%", name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declaration"},
      {type: "SortingIcon", bigWidth: "10%", name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamp"},
      {type: "SortingText", bigWidth: "20%", name: t("DIRECTORY.table.conformance_level"), property: "conformance", justifyCenter: true},
    ]
  ];
  
  const columnsOptions = {
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
      return `${pathURL}directories/${id}/${row.id}`
    }},
    entity: { type: "Skip", center: false, bold: false, decimalPlace: false },
    declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false },
    stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false },
    conformance: { type: "Number", center: true, bold: false, decimalPlace: false }
  };

  const nameOfIcons = [
    t("DIRECTORY.table.stamp_bronze"),
    t("DIRECTORY.table.stamp_silver"),
    t("DIRECTORY.table.stamp_gold"),
    t("DIRECTORY.table.declaration_not_conform"),
    t("DIRECTORY.table.declaration_partial_conform"),
    t("DIRECTORY.table.declaration_conform")
  ];

  const paginationButtonsTexts = [
    t("DIRECTORY.table.paginator.first_page"),
    t("DIRECTORY.table.paginator.previous_page"),
    t("DIRECTORY.table.paginator.next_page"),
    t("DIRECTORY.table.paginator.last_page")
  ];

  const nItemsPerPageText=[
    t("DIRECTORY.table.paginator.see"),
    t("DIRECTORY.table.paginator.per_page")
  ];

  const itemsPaginationText = [
    t("DIRECTORY.table.paginator.of"),
    t("DIRECTORY.table.paginator.items")
  ];

  return { directoriesHeaders, columnsOptions, nameOfIcons, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText };
}

export function checkIfDirectoryOk (id, array) {
  const idObejct = array.directoriesList.find(e => e.id === id);
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

export function getTenCriticalAspectsTable(t) {
  const tenCriticalAspectsHeaders = [
    [
      {type: "Text", nRow: 2, bigWidth: "5%", name: t("DIRECTORY.table.rank"), property: "rank"},
      {type: "Text", nRow: 2, bigWidth: "35%", name: t("DIRECTORY.table.critical_aspect"), property: "name"},
      {id: "compliant", type: "Text", name: t("DIRECTORY.table.compliant"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
      {id: "nonCompliant", type: "Text", name: t("DIRECTORY.table.non_compliant"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
      {id: "nonApplicable", type: "Text", name: t("DIRECTORY.table.non_applicable"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
    ],
    [
      {id: "CT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "compliantTotal", justifyCenter: true},
      {id: "CP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "compliantPercentage", justifyCenter: true},
    ],
    [
      {id: "NCT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "nonCompliantTotal", justifyCenter: true},
      {id: "NCP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "nonCompliantPercentage", justifyCenter: true},
    ],
    [
      {id: "NAT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "nonApplicableTotal", justifyCenter: true},
      {id: "NAP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "nonApplicablePercentage", justifyCenter: true},
    ]
  ]

  const tenCriticalAspectsColumnsOptions = {
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    compliantTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "compliant CT" },
    compliantPercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "compliant CP" },
    nonCompliantTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "nonCompliant NCT" },
    nonCompliantPercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "nonCompliant NCP" },
    nonApplicableTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "nonApplicable NAT" },
    nonApplicablePercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "nonApplicable NAP" },
  }

  return { tenCriticalAspectsHeaders, tenCriticalAspectsColumnsOptions };
}

export function getSuccessCriteriaTable(t) {
  const successCriteriaHeaders = [
    [
      {type: "Text", nRow: 2, bigWidth: "5%", name: t("DIRECTORY.table.rank"), property: "rank"},
      {type: "Text", nRow: 2, bigWidth: "35%", name: t("DIRECTORY.table.success_criteria"), property: "name"},
      {id: "compliant", type: "Text", name: t("DIRECTORY.table.compliant"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
      {id: "nonCompliant", type: "Text", name: t("DIRECTORY.table.non_compliant"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
      {id: "nonApplicable", type: "Text", name: t("DIRECTORY.table.non_applicable"), property: "", justifyCenter: true, multiCol: true, nCol: 2},
    ],
    [
      {id: "CT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "compliantTotal", justifyCenter: true},
      {id: "CP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "compliantPercentage", justifyCenter: true},
    ],
    [
      {id: "NCT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "nonCompliantTotal", justifyCenter: true},
      {id: "NCP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "nonCompliantPercentage", justifyCenter: true},
    ],
    [
      {id: "NAT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "nonApplicableTotal", justifyCenter: true},
      {id: "NAP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "nonApplicablePercentage", justifyCenter: true},
    ]
  ]

  const successCriteriaColumnsOptions = {
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Text", center: false, bold: false, decimalPlace: false },
    compliantTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "compliant CT" },
    compliantPercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "compliant CP" },
    nonCompliantTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "nonCompliant NCT" },
    nonCompliantPercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "nonCompliant NCP" },
    nonApplicableTotal: { type: "Number", center: true, bold: false, decimalPlace: false, headers: "nonApplicable NAT" },
    nonApplicablePercentage: { type: "Text", center: true, bold: false, decimalPlace: false, headers: "nonApplicable NAP" },
  }

  return { successCriteriaHeaders, successCriteriaColumnsOptions };
}

export function getTop5ApplicationsTable(t, id) {
  const top5ApplicationsHeaders = [
    [
      {type: "Text", bigWidth: "10%", name: t("DIRECTORY.table.rank"), property: "rank"},
      {type: "Text", bigWidth: "50%", name: t("DIRECTORY.table.application"), property: "name"},
      {type: "Text", name: t("DIRECTORY.table.conformance_level"), property: "conformance"},
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

export function getApplicationsWithAccessibilityDeclarationTable(t, id) {
  const applicationsWithAccessibilityDeclarationHeaders = [
    [
      {type: "Text", name: t("DIRECTORY.table.line"), property: "line"},
      {type: "Text", name: t("DIRECTORY.table.application"), property: "name"},
      {type: "Icon", name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declaration", justifyCenter: true}
    ]
  ];

  const applicationsWithAccessibilityDeclarationColumnsOptions = {
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    line: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
      return `${pathURL}directories/${id}/${row.id}`
    }},
    declaration: { type: "Declaration", center: true, bold: false, decimalPlace: false }
  };

  const applicationsWithAccessibilityDeclarationNameOfIcons = [
    t("DIRECTORY.table.stamp_bronze"),
    t("DIRECTORY.table.stamp_silver"),
    t("DIRECTORY.table.stamp_gold"),
    t("DIRECTORY.table.declaration_not_conform"),
    t("DIRECTORY.table.declaration_partial_conform"),
    t("DIRECTORY.table.declaration_conform")
  ];

  return { applicationsWithAccessibilityDeclarationHeaders, applicationsWithAccessibilityDeclarationColumnsOptions, applicationsWithAccessibilityDeclarationNameOfIcons };
}

export function getApplicationsWithUsabilityAndAccessibilityStampTable(t, id) {
  const applicationsWithUsabilityAndAccessibilityStampHeaders = [
    [
      {type: "Text", name: t("DIRECTORY.table.line"), property: "line"},
      {type: "Text", name: t("DIRECTORY.table.application"), property: "name"},
      {type: "Icon", name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamp", justifyCenter: true}
    ]
  ];

  const applicationsWithUsabilityAndAccessibilityStampColumnsOptions = {
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    line: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
      return `${pathURL}directories/${id}/${row.id}`
    }},
    stamp: { type: "Stamp", center: true, bold: false, decimalPlace: false }
  };

  const applicationsWithUsabilityAndAccessibilityStampNameOfIcons = [
    t("DIRECTORY.table.stamp_bronze"),
    t("DIRECTORY.table.stamp_silver"),
    t("DIRECTORY.table.stamp_gold"),
    t("DIRECTORY.table.declaration_not_conform"),
    t("DIRECTORY.table.declaration_partial_conform"),
    t("DIRECTORY.table.declaration_conform")
  ];

  return { applicationsWithUsabilityAndAccessibilityStampHeaders, applicationsWithUsabilityAndAccessibilityStampColumnsOptions, applicationsWithUsabilityAndAccessibilityStampNameOfIcons };
}