import React, { useState } from "react";
import { TableMetadata } from "@shared/types";

interface PreviewProps {
  tableData: TableMetadata;
}

export default function Preview({ tableData }: PreviewProps) {
  const [previewPartition, setPreviewPartition] = useState<string>("all");
  
  // If no preview data is available
  if (tableData.previewData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 text-center">
        <svg className="h-12 w-12 mx-auto text-neutral-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6V2M12 22v-4M6 12H2m20 0h-4m1.07-7.07l-2.83 2.83M7.76 16.24l-2.83 2.83m11.31 0l-2.83-2.83M7.76 7.76L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h3 className="mt-4 text-lg font-medium">No Preview Data Available</h3>
        <p className="mt-2 text-neutral-600">
          Preview data is not available for this table.
        </p>
      </div>
    );
  }
  
  // Get all columns from the preview data
  const columns = Object.keys(tableData.previewData[0] || {});
  
  // Get unique partition values
  const partitionColumn = tableData.columns.find(col => col.partitionField)?.name;
  const partitionValues = partitionColumn
    ? ["all", ...new Set(tableData.previewData.map(row => row[partitionColumn]))]
    : ["all"];
  
  // Filter preview data by selected partition
  const filteredPreviewData = previewPartition === "all"
    ? tableData.previewData
    : tableData.previewData.filter(row => 
        partitionColumn && row[partitionColumn] === previewPartition
      );

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Data Preview</h3>
          <div className="flex space-x-2">
            <select 
              className="text-sm border border-neutral-300 rounded py-1 px-2"
              value={previewPartition}
              onChange={(e) => setPreviewPartition(e.target.value)}
            >
              {partitionValues.map((value) => (
                <option key={value} value={value}>
                  {value === "all" 
                    ? "All Partitions" 
                    : `${partitionColumn}=${value}`}
                </option>
              ))}
            </select>
            <button className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-secondary flex items-center">
              <span className="mdi mdi-refresh mr-1"></span>
              Refresh
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredPreviewData.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((column) => (
                    <td key={`${rowIdx}-${column}`} className="px-3 py-2">
                      {row[column]?.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center py-3 text-sm text-neutral-500">
            Showing {filteredPreviewData.length} of {tableData.metrics.rowCount} rows
            <button className="text-primary hover:underline ml-2">Load More</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <h3 className="text-lg font-medium mb-3">Query Data</h3>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label className="font-medium text-sm">SQL Query</label>
            <span className="ml-2 px-2 py-0.5 bg-neutral-100 text-xs rounded">Trino SQL</span>
          </div>
          <div className="relative">
            <textarea
              className="w-full h-24 font-mono text-sm p-3 border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              placeholder="Enter SQL query..."
              defaultValue={`SELECT * FROM ${tableData.name} WHERE ${partitionColumn || 'category'} = '${partitionColumn ? previewPartition : 'Electronics'}' AND price > 100 LIMIT 10;`}
            ></textarea>
            <button className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-neutral-600">
              <span className="mdi mdi-content-copy"></span>
            </button>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <button className="px-3 py-1.5 bg-primary text-white rounded text-sm hover:bg-secondary flex items-center">
            <span className="mdi mdi-play mr-1"></span>
            Run Query
          </button>
        </div>
        <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
          <div className="font-medium mb-2 text-sm flex items-center">
            <span className="mdi mdi-information-outline mr-1 text-neutral-500"></span>
            Query Integration
          </div>
          <p className="text-sm text-neutral-600">
            Connect this viewer to a Trino or Presto cluster to execute queries directly on the discovered tables. You can customize SQL queries or use the built-in templates to explore your data without leaving the interface.
          </p>
        </div>
      </div>
    </div>
  );
}
