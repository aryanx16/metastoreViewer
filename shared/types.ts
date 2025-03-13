// Table formats
export type TableFormat = "parquet" | "iceberg" | "delta" | "hudi";

// Column types
export type ColumnType = "string" | "integer" | "decimal" | "timestamp" | "date" | "boolean" | "float" | "double" | "array" | "map" | "struct";

// Column definition
export interface Column {
  id?: number;
  name: string;
  type: string;
  nullable: boolean;
  description?: string;
  partitionField?: boolean;
}

// Partition information
export interface Partition {
  name: string;
  files: number;
  rows: number;
  size: string;
  lastModified: string;
}

// Snapshot information
export interface Snapshot {
  version: string;
  snapshotId: string;
  timestamp: string;
  operation: string[];
  summary: string;
  current?: boolean;
}

// Schema history entry
export interface SchemaChange {
  version: string;
  date: string;
  changes: string[];
  current?: boolean;
}

// Table metrics
export interface TableMetrics {
  totalFiles: number;
  totalSize: string;
  rowCount: string;
  snapshots: number;
  compressionRatio: number;
}

// Table information
export interface TableInfo {
  format: string;
  location: string;
  uuid?: string;
  created: string;
  lastModified: string;
  partitionFields: string;
}

// Recent activity entry
export interface Activity {
  type: string;
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  version: string;
}

// Partition distribution data
export interface PartitionDistribution {
  name: string;
  percentage: number;
  height: number;
}

// Preview data row
export interface PreviewRow {
  [key: string]: any;
}

// Complete table metadata
export interface TableMetadata {
  id: string;
  name: string;
  format: TableFormat;
  path: string;
  tableInfo: TableInfo;
  metrics: TableMetrics;
  columns: Column[];
  partitions: Partition[];
  snapshots: Snapshot[];
  partitionDistribution: PartitionDistribution[];
  recentActivity: Activity[];
  schemaHistory: SchemaChange[];
  previewData: PreviewRow[];
  metadataFiles: {
    metadataFiles: string[];
    manifestFiles: string[];
    metadataContent: Record<string, string>;
  };
  partitionSpec: {
    fields: string;
    strategy: string;
  };
}

// Data source format
export interface DataSource {
  value: string;
  label: string;
}
