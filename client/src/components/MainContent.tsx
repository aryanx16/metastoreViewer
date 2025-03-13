import React from "react";
import { TableMetadata } from "@shared/types";
import TableHeader from "./TableHeader";
import TabNavigation from "./TabNavigation";
import Overview from "./tabs/Overview";
import Schema from "./tabs/Schema";
import Partitions from "./tabs/Partitions";
import Snapshots from "./tabs/Snapshots";
import Metadata from "./tabs/Metadata";
import Preview from "./tabs/Preview";

interface MainContentProps {
  tableData: TableMetadata | undefined;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLoading: boolean;
}

export default function MainContent({ 
  tableData, 
  activeTab, 
  onTabChange,
  isLoading
}: MainContentProps) {
  
  // If no table is selected yet
  if (!tableData && !isLoading) {
    return (
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-neutral-50 p-6">
          <div className="text-center max-w-md mx-auto">
            <svg className="h-16 w-16 mx-auto text-neutral-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z" stroke="currentColor" strokeWidth="2" />
              <path d="M9 9H15M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-neutral-800">No Table Selected</h2>
            <p className="mt-2 text-neutral-600">
              Select a table from the sidebar to view its metadata and structure.
            </p>
          </div>
        </div>
      </main>
    );
  }
  
  // If loading table data
  if (isLoading) {
    return (
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-neutral-50 p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading table metadata...</p>
          </div>
        </div>
      </main>
    );
  }

  // Active tab content mapping
  const TabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview tableData={tableData} onTabChange={onTabChange} />;
      case "schema":
        return <Schema tableData={tableData} />;
      case "partitions":
        return <Partitions tableData={tableData} />;
      case "snapshots":
        return <Snapshots tableData={tableData} />;
      case "metadata":
        return <Metadata tableData={tableData} />;
      case "preview":
        return <Preview tableData={tableData} />;
      default:
        return <Overview tableData={tableData} onTabChange={onTabChange} />;
    }
  };

  return (
    <main className="flex-1 overflow-hidden flex flex-col">
      <TableHeader tableData={tableData} />
      <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex-1 overflow-auto bg-neutral-50 p-4">
        <TabContent />
      </div>
    </main>
  );
}
