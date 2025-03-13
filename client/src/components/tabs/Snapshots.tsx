import React, { useState } from "react";
import { TableMetadata } from "@shared/types";
import { getFormatColor } from "@/lib/utils";

interface SnapshotsProps {
  tableData: TableMetadata;
}

export default function Snapshots({ tableData }: SnapshotsProps) {
  const [compareFromVersion, setCompareFromVersion] = useState<string>("v6");
  const [compareToVersion, setCompareToVersion] = useState<string>("v7");

  // Check if snapshots are available for this table format
  if (tableData.snapshots.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 text-center">
        <svg className="h-12 w-12 mx-auto text-neutral-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6V2M12 22v-4M6 12H2m20 0h-4m1.07-7.07l-2.83 2.83M7.76 16.24l-2.83 2.83m11.31 0l-2.83-2.83M7.76 7.76L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h3 className="mt-4 text-lg font-medium">No Snapshots Available</h3>
        <p className="mt-2 text-neutral-600">
          {tableData.format === "parquet" 
            ? "Parquet tables do not store snapshot or versioning information."
            : `No snapshot information is available for this ${tableData.format} table.`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4">
        <h3 className="text-lg font-medium mb-3">Snapshot History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Version</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Snapshot ID</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Timestamp</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Operation</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Summary</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {tableData.snapshots.map((snapshot, idx) => (
                <tr key={idx}>
                  <td className="px-3 py-2 font-medium">{snapshot.version} {snapshot.current ? "(current)" : ""}</td>
                  <td className="px-3 py-2 font-mono text-xs">{snapshot.snapshotId}</td>
                  <td className="px-3 py-2">{snapshot.timestamp}</td>
                  <td className="px-3 py-2">
                    {snapshot.operation.map((op, i) => (
                      <span 
                        key={i} 
                        className={`px-1.5 py-0.5 text-xs rounded ${
                          op === "append" 
                            ? "bg-blue-100 text-blue-800" 
                            : op === "schema" 
                              ? "bg-green-100 text-green-800" 
                              : op === "delete" 
                                ? "bg-red-100 text-red-800" 
                                : ""
                        } ${i > 0 ? "ml-1" : ""}`}
                      >
                        {op}
                      </span>
                    ))}
                  </td>
                  <td className="px-3 py-2">{snapshot.summary}</td>
                  <td className="px-3 py-2">
                    <button className="px-2 py-1 text-xs bg-neutral-100 rounded hover:bg-neutral-200">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {tableData.snapshots.length > 1 && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
          <h3 className="text-lg font-medium mb-3">Snapshot Comparison</h3>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-600 mb-1">From Version</label>
              <select 
                className="w-full border border-neutral-300 rounded py-1.5 px-2"
                value={compareFromVersion}
                onChange={(e) => setCompareFromVersion(e.target.value)}
              >
                {tableData.snapshots.slice(1).map((snapshot, idx) => (
                  <option key={idx} value={snapshot.version}>
                    {snapshot.version} ({snapshot.timestamp.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-600 mb-1">To Version</label>
              <select 
                className="w-full border border-neutral-300 rounded py-1.5 px-2"
                value={compareToVersion}
                onChange={(e) => setCompareToVersion(e.target.value)}
              >
                {tableData.snapshots.slice(0, -1).map((snapshot, idx) => (
                  <option key={idx} value={snapshot.version}>
                    {snapshot.version} ({snapshot.timestamp.split(' ')[0]}) {snapshot.current ? "- Current" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-200 font-medium">
              Changes from {compareFromVersion} to {compareToVersion}
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Data Changes</h4>
                  <div className="bg-neutral-50 p-3 rounded border border-neutral-200 text-sm">
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <span className="mdi mdi-plus-circle text-success mr-1"></span>
                        <span>Added 4,523 new rows</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mdi mdi-pencil text-warning mr-1"></span>
                        <span>Modified 1,257 existing rows</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mdi mdi-information-outline text-neutral-500 mr-1"></span>
                        <span>No rows deleted</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Schema Changes</h4>
                  <div className="bg-neutral-50 p-3 rounded border border-neutral-200 text-sm">
                    <p>No schema changes between {compareFromVersion} and {compareToVersion}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Partition Changes</h4>
                  <div className="bg-neutral-50 p-3 rounded border border-neutral-200 text-sm">
                    <ul className="space-y-1">
                      <li className="flex items-center">
                        <span className="mdi mdi-plus-circle text-success mr-1"></span>
                        <span>category=Electronics: 1 new file (+1.2MB)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mdi mdi-plus-circle text-success mr-1"></span>
                        <span>category=Clothing: 2 new files (+2.8MB)</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mdi mdi-plus-circle text-success mr-1"></span>
                        <span>category=Sports: 1 new file (+1.5MB)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
