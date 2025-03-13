import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { TableMetadata, TableSchema, TablePartition, TableVersion, TableProperties } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

// Custom hook to fetch and handle table metadata
export const useTableMetadata = (path: string | null, format?: string) => {
  return useQuery({
    queryKey: ['/api/metadata', path, format],
    enabled: !!path,
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });
};

// Hook for fetching table schema
export const useTableSchema = (path: string | null, format?: string) => {
  return useQuery({
    queryKey: ['/api/schema', path, format],
    enabled: !!path,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for fetching table partitions
export const useTablePartitions = (path: string | null, format?: string) => {
  return useQuery({
    queryKey: ['/api/partitions', path, format],
    enabled: !!path,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for fetching table versions
export const useTableVersions = (path: string | null, format?: string) => {
  return useQuery({
    queryKey: ['/api/versions', path, format],
    enabled: !!path,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for fetching table properties
export const useTableProperties = (path: string | null, format?: string) => {
  return useQuery({
    queryKey: ['/api/properties', path, format],
    enabled: !!path,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for fetching sample data
export const useTableSampleData = (path: string | null, format?: string) => {
  return useQuery({
    queryKey: ['/api/sample-data', path, format],
    enabled: !!path,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for fetching data sources
export const useDataSources = (userId?: number) => {
  const queryParam = userId ? `?userId=${userId}` : '';
  
  return useQuery({
    queryKey: [`/api/datasources${queryParam}`],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for fetching recent tables
export const useRecentTables = (userId?: number) => {
  const queryParam = userId ? `?userId=${userId}` : '';
  
  return useQuery({
    queryKey: [`/api/recent-tables${queryParam}`],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook for adding a data source
export const useAddDataSource = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest('POST', '/api/datasources', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/datasources'] });
    }
  });
};

// Hook for deleting a data source
export const useDeleteDataSource = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest('DELETE', `/api/datasources/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/datasources'] });
    }
  });
};
