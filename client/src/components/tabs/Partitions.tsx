import React, { useState } from "react";
import { TableMetadata } from "@shared/types";

interface PartitionsProps {
  tableData: TableMetadata;
}

export default function Partitions({ tableData }: PartitionsProps) {
  const [partitionVersion, setPartitionVersion] = useState<string>("current");

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4">
        <h3 className="text-lg font-medium mb-3">Partition Specification</h3>
        <div className="space-y-4">
          <div>
            <div className="font-medium mb-1">Partition Fields</div>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 text-sm">
              <div className="font-mono">{tableData.partitionSpec.fields}</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Partition Strategy</div>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 text-sm">
              <p>{tableData.partitionSpec.strategy}</p>
            </div>
          </div>
        </div>
      </div>

      {tableData.partitions.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Partition Details</h3>
            <div>
              <select 
                className="text-sm border border-neutral-300 rounded py-1 px-2"
                value={partitionVersion}
                onChange={(e) => setPartitionVersion(e.target.value)}
              >
                <option value="current">Current Snapshot (v{tableData.snapshots[0]?.version.substring(1) || "1"})</option>
                {tableData.snapshots.slice(1).map((snapshot, idx) => (
                  <option key={idx} value={snapshot.version}>Snapshot {snapshot.version}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Partition</th>
                  <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Files</th>
                  <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Rows</th>
                  <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Size</th>
                  <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Last Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {tableData.partitions.map((partition, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-2 font-medium">{partition.name}</td>
                    <td className="px-3 py-2">{partition.files}</td>
                    <td className="px-3 py-2">{partition.rows.toLocaleString()}</td>
                    <td className="px-3 py-2">{partition.size}</td>
                    <td className="px-3 py-2">{partition.lastModified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <h3 className="text-lg font-medium mb-3">Partition Layout Visualization</h3>
        <div className="tree-view text-sm font-mono">
          <ul className="list-none pl-0">
            <li className="relative pl-5">
              {tableData.path}/
              <ul className="list-none pl-6">
                <li className="relative pl-5">
                  metadata/
                  <ul className="list-none pl-6">
                    <li className="relative pl-5">v{tableData.snapshots[0]?.version.substring(1) || "1"}.metadata.json</li>
                    {tableData.snapshots.slice(1, 3).map((snapshot, idx) => (
                      <li key={idx} className="relative pl-5">v{snapshot.version.substring(1)}.metadata.json</li>
                    ))}
                    <li className="relative pl-5">snap-{tableData.snapshots[0]?.snapshotId || "1234567890"}.avro</li>
                    <li className="relative pl-5">...</li>
                  </ul>
                </li>
                <li className="relative pl-5">
                  data/
                  <ul className="list-none pl-6">
                    {tableData.partitions.slice(0, 3).map((partition, idx) => (
                      <li key={idx} className="relative pl-5">
                        {partition.name}/
                        <ul className="list-none pl-6">
                          <li className="relative pl-5">00001-5-8a7b9c3d.parquet</li>
                          <li className="relative pl-5">00002-5-9c8d7e6f.parquet</li>
                          <li className="relative pl-5">...</li>
                        </ul>
                      </li>
                    ))}
                    <li className="relative pl-5">...</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
