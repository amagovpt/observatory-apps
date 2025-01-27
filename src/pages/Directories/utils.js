import { pathURL } from "../../App";

// Function to get additional Arrays
// t -> the translation function
// RETURNS
// directoriesHeaders -> Headers for the main table
// columnsOptions -> Options to tell the type to render with which property for main table
// statsTitles -> Titles for the StatisticsHeader component
// nameOfIcons -> Name of icons to be showned in the table
export function getDirectoryTable (t) {
  const directoriesHeaders = [
    [
      {type: "Text", bigWidth: "10%", name: t("DIRECTORY.table.rank"), property: "rank"},
      {type: "Text", bigWidth: "50%", name: t("DIRECTORIES.table.name"), property: "name"},
      {type: "Icon", name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declarations", justifyCenter: true},
      {type: "Icon", name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamps", justifyCenter: true},
      {type: "Text", bigWidth: "20%", name: t("DIRECTORY.table.conformance_level"), property: "conformance", justifyCenter: true},
    ]
  ];
  
  const columnsOptions = {
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
      return `${pathURL}directories/${row.id}`
    }},
    declarations: { type: "Number", center: true, bold: false, decimalPlace: false },
    stamps: { type: "Number", center: true, bold: false, decimalPlace: false },
    conformance: { type: "Number", center: true, bold: false, decimalPlace: false }
  };

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

  return { directoriesHeaders, columnsOptions, paginationButtonsTexts, nItemsPerPageText, itemsPaginationText };
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
      {id: "NCT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "nonCompliantTotal", justifyCenter: true},
      {id: "NCP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "nonCompliantPercentage", justifyCenter: true},
      {id: "NAT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "nonApplicableTotal", justifyCenter: true},
      {id: "NAP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "nonApplicablePercentage", justifyCenter: true}
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
      {id: "NCT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "nonCompliantTotal", justifyCenter: true},
      {id: "NCP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "nonCompliantPercentage", justifyCenter: true},
      {id: "NAT", type: "Text", bigWidth: "5%", name: t("DIRECTORY.table.total"), property: "nonApplicableTotal", justifyCenter: true},
      {id: "NAP", type: "Text", bigWidth: "15%", name: t("DIRECTORY.table.percentage"), property: "nonApplicablePercentage", justifyCenter: true}
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

export function getTop5ApplicationsTable(t) {
  const top5ApplicationsHeaders = [
    [
      {type: "Text", bigWidth: "10%", name: t("DIRECTORY.table.rank"), property: "rank"},
      {type: "Text", bigWidth: "50%", name: t("DIRECTORY.table.application"), property: "name"},
      {type: "Text", name: t("DIRECTORY.table.conformance_level"), property: "conformance"},
    ]
  ]

  const top5ApplicationsColumnsOptions = {
    directoryId: { type: "Skip", center: false, bold: false, decimalPlace: false },
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    rank: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
      return `${pathURL}directories/${row.directoryId}/${row.id}`
    }},
    conformance: { type: "Number", center: true, bold: false, decimalPlace: false }
  }

  return { top5ApplicationsHeaders, top5ApplicationsColumnsOptions };
}

export function getApplicationsWithAccessibilityDeclarationTable(t) {
  const applicationsWithAccessibilityDeclarationHeaders = [
    [
      {type: "Text", name: t("DIRECTORY.table.line"), property: "line"},
      {type: "Text", name: t("DIRECTORY.table.application"), property: "name"},
      {type: "Icon", name: "AMA-DeclaracaoDark-Line", description: t("DIRECTORY.table.declaration"), property: "declaration", justifyCenter: true}
    ]
  ];

  const applicationsWithAccessibilityDeclarationColumnsOptions = {
    directoryId: { type: "Skip", center: false, bold: false, decimalPlace: false },
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    line: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
      return `${pathURL}directories/${row.directoryId}/${row.id}`
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

export function getApplicationsWithUsabilityAndAccessibilityStampTable(t) {
  const applicationsWithUsabilityAndAccessibilityStampHeaders = [
    [
      {type: "Text", name: t("DIRECTORY.table.line"), property: "line"},
      {type: "Text", name: t("DIRECTORY.table.application"), property: "name"},
      {type: "Icon", name: "AMA-SeloDark-Line", description: t("DIRECTORY.table.stamp"), property: "stamp", justifyCenter: true}
    ]
  ];

  const applicationsWithUsabilityAndAccessibilityStampColumnsOptions = {
    directoryId: { type: "Skip", center: false, bold: false, decimalPlace: false },
    id: { type: "Skip", center: false, bold: false, decimalPlace: false },
    line: { type: "Number", center: true, bold: false, decimalPlace: false },
    name: { type: "Link", center: false, bold: false, decimalPlace: false, href: (row) => {
      return `${pathURL}directories/${row.directoryId}/${row.id}`
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

export function getGraphs(t, dataList, dataForBars, dataForLines, nApplications, theme) {
  const graphHeaders = dataList.map(() => {
    return [
      t("APPLICATION.tables.compliant"),
      t("APPLICATION.tables.not_compliant"),
      t("APPLICATION.tables.not_applicable")
    ];
  });

  let graphs = [];

  dataList.map((value, index) => {
    const name = value.name;

    const graphData = {
        labels: graphHeaders[index],
        datasets: [
          {
            type: 'line',
            label: t("DIALOGS.scores.cumulative"),
            data: dataForLines[index],
            backgroundColor: 'rgba(51, 51, 153, 1)',
            borderColor: 'rgba(51, 51, 153, 1)',
            borderWidth: 2,
            fill: false,
            tension: 0,
            pointBackgroundColor: 'red', // Set the color of the dots
            pointBorderColor: 'red',     // Set the border color of the dots
          },
          {
            type: 'bar',
            label: t("DIALOGS.scores.frequency"),
            data: dataForBars[index],
            backgroundColor: [      
              '#15ac51',
              '#e90018',
              '#f3d609'
            ],
            borderWidth: 0,
          }
        ]
    };

    const graphOptions = {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of the legend text
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.dataset.type === 'bar') {
                  // Format the tooltip for bar dataset
                  const nApps = (context.raw*nApplications/100).toFixed(0)
                  return [
                    `${label}${context.raw}%`,      // Main value
                    `${t("DIALOGS.scores.frequency")}: ${nApps}` // Additional value
                  ];
                } else if (context.dataset.type === 'line') {
                  // Format the tooltip for line dataset
                  const nApps = (context.raw*nApplications/100).toFixed(0)
                  return [
                    `${label}${context.raw}%`,      // Main value
                    `${t("DIALOGS.scores.percentage")}: ${nApps}` // Additional value
                  ];
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: t("DIALOGS.scores.conformance_state"),
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on X axis
              font: {
                size: 14
              }
            },
            ticks: {
              font: {
                size: 14
              },
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on X axis
            },
            grid: {
              color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers vertically
            }
          },
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: t("DIALOGS.scores.percentage_label"),
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white', // Color of Title on Y axis
              font: {
                size: 14
              }
            },
            ticks: {
              font: {
                size: 14,
              },
              color: theme === "light" ? 'rgba(0,0,0, 1)' : 'white' // Color of Text on Y axis
            },
            grid: {
              color: theme === "light" ? 'rgba(0,0,0, 0.1)' : 'rgba(255, 255, 255, 0.2)' // Color of Dividers horizontaly
            }
          }
        }
      }

      graphs.push({name, graphData, graphOptions});
  });

  return graphs;
}