import React, { useState } from "react";
import { TableMetadata } from "@shared/types";

interface SchemaProps {
  tableData: TableMetadata;
}

export default function Schema({ tableData }: SchemaProps) {
  const [schemaVersion, setSchemaVersion] = useState<string>("current");
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Table Schema</h3>
          <div className="flex space-x-2">
            <select 
              className="text-sm border border-neutral-300 rounded py-1 px-2"
              value={schemaVersion}
              onChange={(e) => setSchemaVersion(e.target.value)}
            >
              <option value="current">Current Schema (v{tableData.schemaHistory[0]?.version.substring(1) || "1"})</option>
              {tableData.schemaHistory.slice(1).map((schema, idx) => (
                <option key={idx} value={schema.version}>Schema {schema.version}</option>
              ))}
            </select>
            <button className="px-2 py-1 bg-white border border-neutral-300 rounded text-sm hover:bg-neutral-50">
              <span className="mdi mdi-file-document-outline mr-1"></span>
              Export Schema
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50 w-1/4">Column</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50 w-1/4">Type</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50 w-1/6">Nullable</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50 w-1/3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {tableData.columns.map((column) => (
                <tr key={column.name} className={column.name === "rating" ? "bg-green-50" : ""}>
                  <td className="px-3 py-2 font-medium">{column.name}</td>
                  <td className="px-3 py-2 font-mono text-xs">{column.type}</td>
                  <td className="px-3 py-2 text-neutral-600">{column.nullable ? "Yes" : "No"}</td>
                  <td className="px-3 py-2 text-neutral-600">{column.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schema Evolution */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <h3 className="text-lg font-medium mb-3">Schema Evolution</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Version</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Date</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Changes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {tableData.schemaHistory.map((history, idx) => (
                <tr key={idx}>
                  <td className="px-3 py-2 font-medium">{history.version} {history.current ? "(current)" : ""}</td>
                  <td className="px-3 py-2">{history.date}</td>
                  <td className="px-3 py-2">
                    {history.changes.map((change, i) => (
                      <span 
                        key={i} 
                        className={`inline-block px-1.5 py-0.5 text-xs rounded mr-1 ${
                          change.startsWith("+") 
                            ? "bg-green-100 text-green-800" 
                            : change.startsWith("~") 
                              ? "bg-blue-100 text-blue-800" 
                              : ""
                        }`}
                      >
                        {change}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
