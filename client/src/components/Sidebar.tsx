import React from "react";
import { DataSource, TableFormat, TableMetadata } from "@shared/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  dataSources: DataSource[];
  selectedDataSource: string;
  onDataSourceChange: (value: string) => void;
  formatFilters: Record<TableFormat, boolean>;
  onFormatFilterChange: (format: TableFormat, checked: boolean) => void;
  tablesByFormat: Record<TableFormat, TableMetadata[]>;
  selectedTable: string | null;
  onTableSelect: (tableId: string) => void;
  isLoading: boolean;
}

export default function Sidebar({
  dataSources,
  selectedDataSource,
  onDataSourceChange,
  formatFilters,
  onFormatFilterChange,
  tablesByFormat,
  selectedTable,
  onTableSelect,
  isLoading
}: SidebarProps) {
  
  const formatColors: Record<TableFormat, string> = {
    parquet: "bg-[#964B00]",
    iceberg: "bg-[#0094FF]",
    delta: "bg-[#AA0082]",
    hudi: "bg-[#FF7D00]"
  };
  
  const formatNames: Record<TableFormat, string> = {
    parquet: "Parquet",
    iceberg: "Iceberg",
    delta: "Delta",
    hudi: "Hudi"
  };

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
      {/* Bucket Selection */}
      <div className="p-4 border-b border-neutral-200">
        <label className="block text-sm font-medium text-neutral-600 mb-1">Data Source</label>
        <div className="relative">
          <select 
            className="block w-full pl-3 pr-10 py-2 text-sm border border-neutral-300 rounded appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={selectedDataSource}
            onChange={(e) => onDataSourceChange(e.target.value)}
          >
            {dataSources.map((source) => (
              <option key={source.value} value={source.value}>{source.label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
            <span className="mdi mdi-chevron-down text-lg"></span>
          </div>
        </div>
      </div>

      {/* Format Filters */}
      <div className="p-4 border-b border-neutral-200">
        <h3 className="font-medium mb-2">Table Formats</h3>
        <div className="space-y-2">
          {(Object.keys(formatFilters) as TableFormat[]).map((format) => (
            <label key={format} className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={formatFilters[format]} 
                onChange={(e) => onFormatFilterChange(format, e.target.checked)}
                className="rounded text-primary focus:ring-primary h-4 w-4"
              />
              <span className="flex items-center">
                <span className={cn("w-3 h-3 rounded-full inline-block mr-2", formatColors[format])}></span>
                <span>{formatNames[format]}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Table Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="font-medium mb-2">Discovered Tables</h3>
        {isLoading ? (
          <div className="py-4 text-center text-sm text-neutral-500">
            Loading tables...
          </div>
        ) : (
          <div className="space-y-4">
            {/* Render each format section */}
            {(Object.keys(tablesByFormat) as TableFormat[]).map((format) => (
              tablesByFormat[format].length > 0 && (
                <div key={format}>
                  <h4 className={cn("flex items-center font-medium", {
                    "text-[#964B00]": format === "parquet",
                    "text-[#0094FF]": format === "iceberg",
                    "text-[#AA0082]": format === "delta",
                    "text-[#FF7D00]": format === "hudi"
                  })}>
                    <span className="mdi mdi-folder-outline mr-1"></span>
                    {formatNames[format]} Tables
                  </h4>
                  <ul className="pl-5 mt-1 space-y-1">
                    {tablesByFormat[format].map((table) => (
                      <li key={table.id}>
                        <a 
                          href="#" 
                          className={cn(
                            "block py-1 px-2 rounded hover:bg-neutral-100 text-sm flex items-center",
                            selectedTable === table.id ? "bg-neutral-100 font-medium" : ""
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            onTableSelect(table.id);
                          }}
                        >
                          <span className={cn("mdi mdi-file-outline mr-1", {
                            "text-[#964B00]": format === "parquet",
                            "text-[#0094FF]": format === "iceberg",
                            "text-[#AA0082]": format === "delta",
                            "text-[#FF7D00]": format === "hudi"
                          })}></span>
                          {table.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}

            {/* Show message if no tables found */}
            {Object.values(tablesByFormat).every(tables => tables.length === 0) && (
              <div className="py-4 text-center text-sm text-neutral-500">
                No tables found. Try adjusting your filters.
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
