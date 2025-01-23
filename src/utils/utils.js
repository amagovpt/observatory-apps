export function createStatisticsObject(page, data, moment) {
    return {
        score: data.avgConformance,
        oldestPage: moment(data.recentPage).format("LL"),
        statsTable: getStatsTable(page, data)
    }
}

function getStatsTable(page, data) {
    switch(page){
        case "home":
            return [
                data.nDirectories,
                data.nEntities,
                data.nApplications
            ];
    }
}