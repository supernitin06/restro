import React from "react";
import ActionButtons from "./UserAction";

const Table = ({
  data = [],
  columns = [],

  actions = [],
  className = "",
  title = "",
  subtitle = "",
}) => {
  // Check if actions column should be added
  const hasActionsColumn = columns.some(
    (col) => col.header === "Actions" || col.key === "actions"
  );
  const displayColumns = hasActionsColumn
    ? columns
    : actions.length > 0
      ? [...columns, { header: "Actions", key: "actions" }]
      : columns;

  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm ${className}`}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="overflow-x-auto overflow-y-auto">
        <table className="min-w-full">
          <thead className="bg-primary z-30 sticky top-0">
            <tr>
              {displayColumns.map((col, index) => (
                <th
                  key={col.key || index}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${index === 0
                      ? "sticky z-40 left-0 bg-primary "
                      : ""
                    }`}
                >
                  {(() => {
                    const header = col.header || col.label;
                    if (typeof header === 'string') {
                      return header;
                    }
                    if (typeof header === 'function') {
                      return header();
                    }
                    if (React.isValidElement(header)) {
                      return header;
                    }
                    return String(header || '');
                  })()}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={displayColumns.length}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                const rowKey = row.id || row._id || `row-${rowIndex}`;

                return (
                  <tr
                    key={rowKey}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {displayColumns.map((col, colIndex) => {
                      if (col.key === "actions") {
                        return (
                          <td
                            key="actions"
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <ActionButtons
                              item={row}
                              actions={actions}
                              size="sm"
                              variant="ghost"
                            />
                          </td>
                        );
                      }

                      // Use render function if provided
                      if (col.render && typeof col.render === 'function') {
                        const renderResult = col.render(row);
                        // Ensure we're rendering valid React elements
                        if (React.isValidElement(renderResult) ||
                          typeof renderResult === 'string' ||
                          typeof renderResult === 'number' ||
                          renderResult === null ||
                          renderResult === undefined) {
                          return (
                            <td
                              key={col.key || colIndex}
                              className={`px-6 py-4 whitespace-nowrap ${colIndex === 0
                                  ? "sticky left-0 bg-white dark:bg-gray-800 z-20"
                                  : ""
                                }`}
                            >
                              {renderResult}
                            </td>
                          );
                        }
                        // Fallback if render returns something invalid
                        return (
                          <td
                            key={col.key || colIndex}
                            className={`px-6 py-4 whitespace-nowrap ${colIndex === 0
                                ? "sticky left-0 bg-white dark:bg-gray-800 z-20"
                                : ""
                              }`}
                          >
                            {String(renderResult)}
                          </td>
                        );
                      }

                      // Otherwise use key to access data
                      if (col.key) {
                        const cellValue = row[col.key];
                        return (
                          <td
                            key={col.key || colIndex}
                            className={`px-6 py-4 whitespace-nowrap ${colIndex === 0
                                ? "sticky left-0 bg-white dark:bg-gray-800 z-20"
                                : ""
                              }`}
                          >
                            {cellValue !== undefined && cellValue !== null
                              ? String(cellValue)
                              : "-"}
                          </td>
                        );
                      }

                      // Fallback for columns without key or render
                      return (
                        <td
                          key={colIndex}
                          className={`px-6 py-4 whitespace-nowrap ${colIndex === 0
                              ? "sticky left-0 bg-white dark:bg-gray-800 z-20"
                              : ""
                            }`}
                        >
                          -
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {data.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {data.length}
          </span>{" "}
          {title.toLowerCase() || "items"}
        </div>
      )}
    </div>
  );
};

export default Table;
