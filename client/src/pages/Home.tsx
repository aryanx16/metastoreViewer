import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PathInput from "@/components/PathInput";
import TableSummary from "@/components/TableSummary";
import TabNavigation from "@/components/TabNavigation";
import MetadataViewer from "@/components/MetadataViewer";
import { useTableMetadata } from "@/hooks/useTableMetadata";
import { UserContext } from "@/App";
import { useContext } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the possible tab values
type TabValue = "overview" | "schema" | "partitions" | "versions" | "properties" | "sample-data";

export default function Home() {
  const [path, setPath] = useState<string>("s3://analytics-bucket/customer_data/");
  const [activeTab, setActiveTab] = useState<TabValue>("overview");
  const { userId } = useContext(UserContext);
  const { toast } = useToast();

  // Fetch table metadata
  const { data: tableMetadata, isLoading, isError, error } = useTableMetadata(
    path ? path : null,
    undefined
  );

  // Handle fetch button click
  const handleFetch = (newPath: string) => {
    setPath(newPath);
  };

  // Show error toast if metadata fetch fails
  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error fetching metadata",
        description: error.message || "Failed to load table metadata",
        variant: "destructive"
      });
    }
  }, [isError, error, toast]);

  return (
    <div className="h-screen flex flex-col bg-neutral-50 text-neutral-900">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar onSelectTable={(tablePath) => setPath(tablePath)} />

        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Path Input */}
          <PathInput onFetch={handleFetch} initialPath={path} />

          {/* Table Summary */}
          {tableMetadata && (
            <TableSummary metadata={tableMetadata} isLoading={isLoading} />
          )}

          {/* Tab Navigation */}
          <TabNavigation 
            activeTab={activeTab} 
            onChange={(value) => setActiveTab(value as TabValue)} 
          />

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-neutral-50">
            {tableMetadata && (
              <MetadataViewer 
                metadata={tableMetadata} 
                activeTab={activeTab} 
                isLoading={isLoading} 
              />
            )}

            {isLoading && !tableMetadata && (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {!isLoading && !tableMetadata && !isError && (
              <div className="flex flex-col items-center justify-center h-full text-neutral-500">
                <div className="text-5xl mb-4">
                  <i className="ri-inbox-line"></i>
                </div>
                <h3 className="text-xl font-medium mb-2">No Table Selected</h3>
                <p>Enter an S3 path and click 'Fetch Metadata' to view table details</p>
              </div>
            )}

            {isError && (
              <div className="flex flex-col items-center justify-center h-full text-red-500">
                <div className="text-5xl mb-4">
                  <i className="ri-error-warning-line"></i>
                </div>
                <h3 className="text-xl font-medium mb-2">Error Loading Metadata</h3>
                <p>{error?.message || "Failed to load table metadata"}</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Menu - visible on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-2 py-1 flex justify-around">
        <button 
          className={`p-2 flex flex-col items-center ${activeTab === "overview" ? "text-primary" : "text-neutral-500"}`}
          onClick={() => setActiveTab("overview")}
        >
          <i className="ri-dashboard-line text-xl"></i>
          <span className="text-xs mt-1">Overview</span>
        </button>
        <button 
          className={`p-2 flex flex-col items-center ${activeTab === "schema" ? "text-primary" : "text-neutral-500"}`}
          onClick={() => setActiveTab("schema")}
        >
          <i className="ri-file-list-line text-xl"></i>
          <span className="text-xs mt-1">Schema</span>
        </button>
        <button 
          className={`p-2 flex flex-col items-center ${activeTab === "partitions" ? "text-primary" : "text-neutral-500"}`}
          onClick={() => setActiveTab("partitions")}
        >
          <i className="ri-table-line text-xl"></i>
          <span className="text-xs mt-1">Partitions</span>
        </button>
        <button 
          className={`p-2 flex flex-col items-center ${activeTab === "versions" ? "text-primary" : "text-neutral-500"}`}
          onClick={() => setActiveTab("versions")}
        >
          <i className="ri-history-line text-xl"></i>
          <span className="text-xs mt-1">Versions</span>
        </button>
        <button 
          className={`p-2 flex flex-col items-center ${
            activeTab === "properties" || activeTab === "sample-data" 
              ? "text-primary" 
              : "text-neutral-500"
          }`}
          onClick={() => {
            // Toggle between properties and sample data
            if (activeTab === "properties") {
              setActiveTab("sample-data");
            } else {
              setActiveTab("properties");
            }
          }}
        >
          <i className="ri-more-line text-xl"></i>
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </div>
  );
}
