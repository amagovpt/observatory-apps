// Hooks
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../context/ThemeContext";

// Components
import { SortingTable } from "ama-design-system";

export function GoodBadTab({ main_content_directories, columnsOptions, tableHeaders, table, goodOrBad }) {

  const { t, i18n: { language } } = useTranslation();

  // Theme
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`bg-white ${main_content_directories} d-flex flex-row justify-content-center align-items-center`}
    >
      <div className="d-flex flex-column section_container best_practises p-3">
        {/* Table for Practices */}
        <h2 className="bold mt-5">{t(`DIRECTORY.${goodOrBad}.title`)}</h2>
        <p className="ama-typography-body-large mb-3">
          {t(`DIRECTORY.${goodOrBad}.subtitle`)}
        </p>
        <div className="light_tables">
          {table && table.length > 0 ? (
            <SortingTable
              hasSort={false}
              headers={tableHeaders}
              dataList={table}
              columnsOptions={columnsOptions}
              darkTheme={theme}
              pagination={false}
              links={false}
              caption={t(`DIRECTORY.${goodOrBad}.title`)}
            />
          ) : <p className="ama-typography-body-large mb-3">{t(`APPLICATION.empty_table`)}</p>}
        </div>
      </div>
    </section>
  );
}
