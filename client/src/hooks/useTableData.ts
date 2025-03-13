import { useQuery } from "@tanstack/react-query";
import { TableMetadata } from "@shared/types";

export function useTableData(tableId: string | null) {
  return useQuery<TableMetadata>({
    queryKey: [`/api/tables/${tableId}`],
    enabled: !!tableId,
  });
}

export function useTablesList() {
  return useQuery<TableMetadata[]>({
    queryKey: ['/api/tables'],
  });
}

export function useTablesByFormat(format: string) {
  return useQuery<TableMetadata[]>({
    queryKey: [`/api/tables/format/${format}`],
  });
}

export function useDataSources() {
  return useQuery<{value: string, label: string}[]>({
    queryKey: ['/api/datasources'],
  });
}

export function useTableSchema(tableId: string | null) {
  return useQuery<{columns: any[], schemaHistory: any[]}>({
    queryKey: [`/api/tables/${tableId}/schema`],
    enabled: !!tableId,
  });
}

export function useTablePartitions(tableId: string | null) {
  return useQuery<{partitions: any[], partitionSpec: any, partitionDistribution: any[]}>({
    queryKey: [`/api/tables/${tableId}/partitions`],
    enabled: !!tableId,
  });
}

export function useTableSnapshots(tableId: string | null) {
  return useQuery<{snapshots: any[], recentActivity: any[]}>({
    queryKey: [`/api/tables/${tableId}/snapshots`],
    enabled: !!tableId,
  });
}

export function useTableMetadataFiles(tableId: string | null) {
  return useQuery<{metadataFiles: string[], manifestFiles: string[], metadataContent: Record<string, string>}>({
    queryKey: [`/api/tables/${tableId}/metadata`],
    enabled: !!tableId,
  });
}

export function useTablePreview(tableId: string | null) {
  return useQuery<any[]>({
    queryKey: [`/api/tables/${tableId}/preview`],
    enabled: !!tableId,
  });
}
