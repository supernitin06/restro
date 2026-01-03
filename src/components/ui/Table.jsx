import React from "react";

const Table = ({
  columns = [],
  data = [],
  className = "",
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {columns.map((col) => (
                <td key={col.header} className="px-6 py-4 align-middle">
                  {col.cell({ row: { original: row } })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
