import React from "react";
import { TableMetadata } from "@shared/types";
import { getFormatColor } from "@/lib/utils";

interface TableHeaderProps {
  tableData: TableMetadata;
}

export default function TableHeader({ tableData }: TableHeaderProps) {
  return (
    <div className="bg-white border-b border-neutral-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <span className={`w-3 h-3 rounded-full inline-block mr-2 ${getFormatColor(tableData.format)}`}></span>
            {tableData.name} <span className="text-neutral-500 ml-2 text-sm">({tableData.format.charAt(0).toUpperCase() + tableData.format.slice(1)})</span>
          </h2>
          <p className="text-neutral-500 text-sm mt-1">{tableData.path}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 bg-white border border-neutral-300 rounded text-sm hover:bg-neutral-50 flex items-center">
            <span className="mdi mdi-download mr-1"></span>
            Export Metadata
          </button>
          <button className="px-3 py-1.5 bg-primary text-white rounded text-sm hover:bg-secondary flex items-center">
            <span className="mdi mdi-code-braces mr-1"></span>
            Query Data
          </button>
        </div>
      </div>
    </div>
  );
}
