export function checkIfDirectoryOk (id, array) {
  const idObejct = array.directoriesList.find(e => e.id === id)
  return idObejct ? true : false;
}

export function checkIfApplicationOk (id, applicationId, array) {
  const applicationObejct = array.directories[id].applicationsList.find(e => e.id === applicationId)
  return applicationObejct ? true : false;
}

export function getStatsTitles(t, global) {
  var res = [t("APPLICATION.accessibility_declaration.contains")];
  
  if (global.accessibilityDeclaration.state) {
    res = res.concat(t("APPLICATION.accessibility_declaration.declaration_state"), t("APPLICATION.accessibility_declaration.emission_date"));
  }

  res = res.concat(t("APPLICATION.usability_accessibility_stamp.contains"));

  if (global.usabilityAccessibilityStamp.stampLevel) {
    res = res.concat(t("APPLICATION.usability_accessibility_stamp.stamp_level"), t("APPLICATION.usability_accessibility_stamp.validity_date"));
  }

  return res;
}

export function getStatsTable(t, global, moment, pathURL) {
  const declarationAlternativeText = [t("DIRECTORY.table.declaration_not_conform"), t("DIRECTORY.table.declaration_partially_conform"), t("DIRECTORY.table.declaration_conform")];
  const stampAlternativeText = [t("DIRECTORY.table.stamp_bronze"), t("DIRECTORY.table.stamp_silver"), t("DIRECTORY.table.stamp_gold")];

  var statsTable = [];
  var threshold = 1;

  if (global.accessibilityDeclaration.state) {
    threshold = 3;
    statsTable = [
      <h3 className="bold"><img src={getDeclaration(global.accessibilityDeclaration.declaration, pathURL)} alt={declarationAlternativeText[global.accessibilityDeclaration.declaration - 1]} /></h3>,
      <h3 className="bold">{t(`APPLICATION.accessibility_declaration.state.${global.accessibilityDeclaration.state}`)}</h3>,
      <h3 className="bold">{moment(global.accessibilityDeclaration.date).format("LL")}</h3>
    ];
  } else {
    statsTable = [
      <h3 className="bold">{"None"}</h3>
    ];
  }

  if (global.usabilityAccessibilityStamp.stampLevel) {
    statsTable = statsTable.concat(
      <h3 className="bold"><img src={getStamp(global.usabilityAccessibilityStamp.stamp, pathURL)} alt={stampAlternativeText[global.usabilityAccessibilityStamp.stamp - 1]} /></h3>,
      <h3 className="bold">{t(`APPLICATION.usability_accessibility_stamp.level.${global.usabilityAccessibilityStamp.stampLevel}`)}</h3>,
      <h3 className="bold">{moment(global.usabilityAccessibilityStamp.validityDate).format("LL")}</h3>
    );
  } else {
    statsTable = statsTable.concat(
      <h3 className="bold">{"None"}</h3>
    );
  }

  return {threshold, statsTable};
}

function getDeclaration(decl, pathURL) {
  switch(decl) {
    case 1:
      return `${pathURL}img/SVG_Declaracao_Nao_Conforme.svg`;
    case 2:
      return `${pathURL}img/SVG_Declaracao_Parcial_Conforme.svg`;
    case 3:
      return `${pathURL}img/SVG_Declaracao_Conforme.svg`;
    default:
      return null;
  }
}

function getStamp(stmp, pathURL) {
  switch(stmp) {
    case 1:
      return `${pathURL}img/SVG_Selo_Bronze.svg`;
    case 2:
      return `${pathURL}img/SVG_Selo_Prata.svg`;
    case 3:
      return `${pathURL}img/SVG_Selo_Ouro.svg`;
    default:
      return null;
  }
}