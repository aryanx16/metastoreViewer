import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import { useQuery } from "@tanstack/react-query";
import { TableMetadata, DataSource, TableFormat } from "@shared/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [selectedDataSource, setSelectedDataSource] = useState<string>("s3://demo-bucket");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [formatFilters, setFormatFilters] = useState<Record<TableFormat, boolean>>({
    parquet: true,
    iceberg: true,
    delta: true,
    hudi: true
  });

  // Fetch data sources
  const { data: dataSources } = useQuery<DataSource[]>({
    queryKey: ['/api/datasources'],
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load data sources",
        variant: "destructive"
      });
    }
  });

  // Fetch all tables
  const { data: tables, isLoading } = useQuery<TableMetadata[]>({
    queryKey: ['/api/tables'],
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load tables",
        variant: "destructive"
      });
    }
  });

  // Fetch selected table details
  const { data: selectedTableData } = useQuery<TableMetadata>({
    queryKey: [`/api/tables/${selectedTable}`],
    enabled: !!selectedTable,
    onSuccess: () => {
      // Reset to overview tab when a new table is selected
      setActiveTab("overview");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load table details",
        variant: "destructive"
      });
    }
  });

  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleFormatFilterChange = (format: TableFormat, checked: boolean) => {
    setFormatFilters(prev => ({
      ...prev,
      [format]: checked
    }));
  };

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
  };

  // Filter tables by selected formats
  const filteredTables = tables?.filter(table => formatFilters[table.format]) || [];

  // Group tables by format
  const tablesByFormat: Record<TableFormat, TableMetadata[]> = {
    parquet: [],
    iceberg: [],
    delta: [],
    hudi: []
  };

  filteredTables.forEach(table => {
    tablesByFormat[table.format].push(table);
  });

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          dataSources={dataSources || []}
          selectedDataSource={selectedDataSource}
          onDataSourceChange={setSelectedDataSource}
          formatFilters={formatFilters}
          onFormatFilterChange={handleFormatFilterChange}
          tablesByFormat={tablesByFormat}
          selectedTable={selectedTable}
          onTableSelect={handleTableSelect}
          isLoading={isLoading}
        />
        <MainContent 
          tableData={selectedTableData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isLoading={!selectedTableData && !!selectedTable}
        />
      </div>
    </div>
  );
}
