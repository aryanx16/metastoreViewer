import React from "react";
import { TableMetadata } from "@shared/types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getFormatColor } from "@/lib/utils";

interface OverviewProps {
  tableData: TableMetadata;
  onTabChange: (tab: string) => void;
}

export default function Overview({ tableData, onTabChange }: OverviewProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Table Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
          <h3 className="text-lg font-medium mb-3">Table Information</h3>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-1.5 text-neutral-500 pr-4">Format</td>
                <td className="py-1.5 font-medium">{tableData.tableInfo.format}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-neutral-500 pr-4">Location</td>
                <td className="py-1.5">{tableData.tableInfo.location}</td>
              </tr>
              {tableData.tableInfo.uuid && (
                <tr>
                  <td className="py-1.5 text-neutral-500 pr-4">Table UUID</td>
                  <td className="py-1.5 font-mono text-xs">{tableData.tableInfo.uuid}</td>
                </tr>
              )}
              <tr>
                <td className="py-1.5 text-neutral-500 pr-4">Created</td>
                <td className="py-1.5">{tableData.tableInfo.created}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-neutral-500 pr-4">Last Modified</td>
                <td className="py-1.5">{tableData.tableInfo.lastModified}</td>
              </tr>
              <tr>
                <td className="py-1.5 text-neutral-500 pr-4">Partition Fields</td>
                <td className="py-1.5">{tableData.tableInfo.partitionFields}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table Metrics Card */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
          <h3 className="text-lg font-medium mb-3">Table Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
              <div className="text-neutral-500 text-sm">Total Files</div>
              <div className="text-2xl font-medium mt-1">{tableData.metrics.totalFiles}</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
              <div className="text-neutral-500 text-sm">Total Size</div>
              <div className="text-2xl font-medium mt-1">{tableData.metrics.totalSize}</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
              <div className="text-neutral-500 text-sm">Row Count</div>
              <div className="text-2xl font-medium mt-1">{tableData.metrics.rowCount}</div>
            </div>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200">
              <div className="text-neutral-500 text-sm">Snapshots</div>
              <div className="text-2xl font-medium mt-1">{tableData.metrics.snapshots}</div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Storage Optimization</h4>
            <div className="flex items-center">
              <div className="w-full bg-neutral-200 rounded-full h-2.5">
                <div className="bg-success h-2.5 rounded-full" style={{ width: `${tableData.metrics.compressionRatio}%` }}></div>
              </div>
              <span className="ml-2 text-sm font-medium">{tableData.metrics.compressionRatio}%</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">Compression ratio based on raw vs. stored data size</p>
          </div>
        </div>
      </div>

      {/* Schema Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Schema Summary</h3>
          <button 
            className="text-primary text-sm hover:underline"
            onClick={() => onTabChange("schema")}
          >
            View Full Schema →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Column</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Type</th>
                <th className="px-3 py-2 text-left font-medium text-neutral-500 bg-neutral-50">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {tableData.columns.slice(0, 5).map((column) => (
                <tr key={column.name}>
                  <td className="px-3 py-2 font-medium">{column.name}</td>
                  <td className="px-3 py-2 font-mono text-xs">{column.type}</td>
                  <td className="px-3 py-2 text-neutral-600">{column.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center py-2 text-sm text-neutral-500">
            Showing 5 of {tableData.columns.length} columns
          </div>
        </div>
      </div>

      {/* Partition Distribution */}
      {tableData.partitionDistribution.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Partition Distribution</h3>
            <button 
              className="text-primary text-sm hover:underline"
              onClick={() => onTabChange("partitions")}
            >
              View All Partitions →
            </button>
          </div>
          <div className="flex">
            <div className="flex-1 px-2">
              <div className="h-40 flex items-end justify-around">
                {tableData.partitionDistribution.map((partition, idx) => (
                  <div key={idx} className="w-1/6">
                    <div 
                      className={`${getFormatColor(tableData.format)} h-${partition.height} rounded-t`}
                      style={{ height: `${partition.height * 3}px` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-around text-xs text-neutral-500 mt-1">
                {tableData.partitionDistribution.map((partition, idx) => (
                  <div key={idx}>{partition.name}</div>
                ))}
              </div>
            </div>
            <div className="w-48 pl-4 border-l border-neutral-200">
              <h4 className="text-sm font-medium mb-2">Top Partitions</h4>
              <div className="space-y-2">
                {tableData.partitionDistribution
                  .sort((a, b) => b.percentage - a.percentage)
                  .slice(0, 3)
                  .map((partition, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="flex justify-between">
                        <span>{partition.name}</span>
                        <span className="font-medium">{partition.percentage}%</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-neutral-200 rounded-full">
                        <div 
                          className={`${getFormatColor(tableData.format)} h-1.5 rounded-full`}
                          style={{ width: `${partition.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {tableData.recentActivity.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <button 
              className="text-primary text-sm hover:underline"
              onClick={() => onTabChange("snapshots")}
            >
              View All Snapshots →
            </button>
          </div>
          <div className="space-y-3">
            {tableData.recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start border-b border-neutral-100 pb-3">
                <div className={`w-8 h-8 rounded-full ${activity.type === 'snapshot' ? getFormatColor(tableData.format) : 'bg-neutral-200 text-neutral-600'} text-white flex items-center justify-center mr-3`}>
                  <span className={activity.icon}></span>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-neutral-500">
                    {activity.description}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">{activity.timestamp}</div>
                </div>
                <div>
                  <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded">{activity.version}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
