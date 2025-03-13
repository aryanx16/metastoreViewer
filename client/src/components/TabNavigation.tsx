import React from "react";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "schema", label: "Schema" },
    { id: "partitions", label: "Partitions" },
    { id: "snapshots", label: "Snapshots & Versions" },
    { id: "metadata", label: "Metadata Files" },
    { id: "preview", label: "Data Preview" }
  ];

  return (
    <div className="bg-white border-b border-neutral-200 px-4 flex overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={cn(
            "px-4 py-2 border-b-2 whitespace-nowrap", 
            activeTab === tab.id
              ? "border-primary text-primary font-medium"
              : "border-transparent hover:text-primary"
          )}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
