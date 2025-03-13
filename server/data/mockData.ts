import { TableMetadata } from "@shared/types";

export const mockTablesData: TableMetadata[] = [
  // Iceberg table - Products
  {
    id: "products",
    name: "products",
    format: "iceberg",
    path: "s3://demo-bucket/data/products",
    tableInfo: {
      format: "Iceberg (v2)",
      location: "s3://demo-bucket/data/products",
      uuid: "fa52cf8b-f67c-4ede-9d97-3d9b17a7df86",
      created: "2023-05-15 09:23:47",
      lastModified: "2023-08-22 14:45:32",
      partitionFields: "category (string)"
    },
    metrics: {
      totalFiles: 24,
      totalSize: "1.2 GB",
      rowCount: "4.5M",
      snapshots: 7,
      compressionRatio: 85
    },
    columns: [
      { id: 1, name: "product_id", type: "integer", nullable: false, description: "Primary key" },
      { id: 2, name: "name", type: "string", nullable: false, description: "Product name" },
      { id: 3, name: "description", type: "string", nullable: true, description: "Product description" },
      { id: 4, name: "category", type: "string", nullable: false, description: "Product category (partition field)", partitionField: true },
      { id: 5, name: "price", type: "decimal(10,2)", nullable: false, description: "Product price" },
      { id: 8, name: "inventory", type: "integer", nullable: true, description: "Current inventory count" },
      { id: 9, name: "supplier_id", type: "integer", nullable: true, description: "Foreign key to suppliers table" },
      { id: 10, name: "rating", type: "decimal(3,1)", nullable: true, description: "Product rating (added in v6)" },
      { id: 6, name: "created_at", type: "timestamp", nullable: false, description: "Creation timestamp" },
      { id: 7, name: "updated_at", type: "timestamp", nullable: true, description: "Last update timestamp" }
    ],
    partitions: [
      { name: "category=Electronics", files: 5, rows: 1247892, size: "345 MB", lastModified: "2023-08-22" },
      { name: "category=Clothing", files: 6, rows: 1425632, size: "412 MB", lastModified: "2023-08-22" },
      { name: "category=Home", files: 4, rows: 723145, size: "215 MB", lastModified: "2023-07-15" },
      { name: "category=Sports", files: 5, rows: 1089254, size: "298 MB", lastModified: "2023-08-22" },
      { name: "category=Other", files: 4, rows: 512745, size: "143 MB", lastModified: "2023-06-30" }
    ],
    snapshots: [
      { version: "v7", snapshotId: "3892547623857", timestamp: "2023-08-22 14:45:32", operation: ["append"], summary: "Added 4,523 rows, modified 1,257 rows", current: true },
      { version: "v6", snapshotId: "5789234892345", timestamp: "2023-07-18 09:12:05", operation: ["schema"], summary: "Added column 'rating'" },
      { version: "v5", snapshotId: "9823475928374", timestamp: "2023-06-02 16:32:41", operation: ["schema", "append"], summary: "Modified 'price' column type, added 2,143 rows" },
      { version: "v4", snapshotId: "1293847562934", timestamp: "2023-05-28 11:23:09", operation: ["schema"], summary: "Added columns 'supplier_id', 'inventory'" }
    ],
    partitionDistribution: [
      { name: "Electronics", percentage: 28, height: 24 },
      { name: "Clothing", percentage: 32, height: 32 },
      { name: "Home", percentage: 16, height: 16 },
      { name: "Sports", percentage: 24, height: 28 },
      { name: "Other", percentage: 12, height: 12 }
    ],
    recentActivity: [
      { 
        type: "snapshot", 
        icon: "mdi mdi-code-json", 
        title: "Snapshot created", 
        description: "Added 4,523 rows, modified 1,257 rows", 
        timestamp: "2023-08-22 14:45:32", 
        version: "v7" 
      },
      { 
        type: "schema", 
        icon: "mdi mdi-table-column", 
        title: "Schema evolution", 
        description: "Added column 'rating' (decimal)", 
        timestamp: "2023-07-18 09:12:05", 
        version: "v6" 
      }
    ],
    schemaHistory: [
      { version: "v7", date: "2023-08-22", changes: ["No schema changes"], current: true },
      { version: "v6", date: "2023-07-18", changes: ["+ Added column: rating (decimal(3,1))"] },
      { version: "v5", date: "2023-06-02", changes: ["~ Modified: price (decimal(8,2) → decimal(10,2))"] },
      { version: "v4", date: "2023-05-28", changes: ["+ Added column: supplier_id (integer)", "+ Added column: inventory (integer)"] }
    ],
    previewData: [
      { product_id: 1001, name: "Wireless Earbuds Pro", category: "Electronics", price: 129.99, inventory: 342, rating: 4.7, created_at: "2023-05-15 10:23:47" },
      { product_id: 1002, name: "Smart Fitness Watch", category: "Electronics", price: 199.99, inventory: 156, rating: 4.5, created_at: "2023-05-15 11:15:22" },
      { product_id: 1523, name: "Men's Running Jacket", category: "Clothing", price: 89.95, inventory: 213, rating: 4.2, created_at: "2023-05-16 09:34:18" },
      { product_id: 1524, name: "Women's Yoga Pants", category: "Clothing", price: 64.50, inventory: 427, rating: 4.8, created_at: "2023-05-16 10:12:54" },
      { product_id: 2103, name: "Smart Home Speaker", category: "Electronics", price: 179.99, inventory: 89, rating: 4.3, created_at: "2023-05-18 14:27:39" },
      { product_id: 2785, name: "Professional Tennis Racket", category: "Sports", price: 159.99, inventory: 76, rating: 4.6, created_at: "2023-05-22 08:43:12" },
      { product_id: 3142, name: "Stainless Steel Cookware Set", category: "Home", price: 249.99, inventory: 42, rating: 4.4, created_at: "2023-05-24 16:58:27" }
    ],
    metadataFiles: {
      metadataFiles: [
        "metadata/v7.metadata.json (current)",
        "metadata/v6.metadata.json",
        "metadata/v5.metadata.json",
        "metadata/v4.metadata.json",
        "metadata/v3.metadata.json",
        "metadata/snap-3892547623857.avro",
        "metadata/snap-5789234892345.avro",
        "metadata/snap-9823475928374.avro",
        "metadata/snap-1293847562934.avro"
      ],
      manifestFiles: [
        "metadata/manifests/manifest_list.avro",
        "metadata/manifests/m-001.avro",
        "metadata/manifests/m-002.avro",
        "metadata/manifests/m-003.avro",
        "metadata/manifests/m-004.avro",
        "metadata/manifests/m-005.avro"
      ],
      metadataContent: {
        "v7": `{
  "format-version": 2,
  "table-uuid": "fa52cf8b-f67c-4ede-9d97-3d9b17a7df86",
  "location": "s3://demo-bucket/data/products",
  "last-updated-ms": 1692713132000,
  "last-column-id": 10,
  "schema": {
    "type": "struct",
    "fields": [
      {
        "id": 1,
        "name": "product_id",
        "required": true,
        "type": "int"
      },
      {
        "id": 2,
        "name": "name",
        "required": true,
        "type": "string"
      },
      {
        "id": 3,
        "name": "description",
        "required": false,
        "type": "string"
      },
      {
        "id": 4,
        "name": "category",
        "required": true,
        "type": "string"
      },
      {
        "id": 5,
        "name": "price",
        "required": true,
        "type": "decimal(10,2)"
      },
      {
        "id": 8,
        "name": "inventory",
        "required": false,
        "type": "int"
      },
      {
        "id": 9,
        "name": "supplier_id",
        "required": false,
        "type": "int"
      },
      {
        "id": 10,
        "name": "rating",
        "required": false,
        "type": "decimal(3,1)"
      },
      {
        "id": 6,
        "name": "created_at",
        "required": true,
        "type": "timestamp"
      },
      {
        "id": 7,
        "name": "updated_at",
        "required": false,
        "type": "timestamp"
      }
    ]
  },
  "current-schema-id": 1,
  "schemas": [
    {
      "type": "struct",
      "schema-id": 0,
      "fields": [...]
    },
    {
      "type": "struct",
      "schema-id": 1,
      "fields": [...]
    }
  ],
  "partition-spec": [
    {
      "name": "category",
      "transform": "identity",
      "source-id": 4,
      "field-id": 1000
    }
  ],
  "default-spec-id": 0,
  "partition-specs": [...],
  "last-partition-id": 1000,
  "properties": {
    "write.format.default": "parquet",
    "write.parquet.compression-codec": "snappy"
  },
  "current-snapshot-id": 3892547623857,
  "snapshots": [
    {
      "snapshot-id": 3892547623857,
      "timestamp-ms": 1692713132000,
      "summary": {
        "operation": "append",
        "added-files": "4",
        "added-records": "4523",
        "changed-partition-count": "3",
        "total-records": "4998668",
        "total-files-size": "1413642752"
      },
      "manifest-list": "s3://demo-bucket/data/products/metadata/snap-3892547623857-1.avro"
    },
    ...
  ],
  "snapshot-log": [
    {
      "timestamp-ms": 1692713132000,
      "snapshot-id": 3892547623857
    },
    ...
  ],
  "metadata-log": [...]
}`
      }
    },
    partitionSpec: {
      fields: "category : string (identity transform)",
      strategy: "The table is partitioned by the category field using an identity transform. This means data is organized into directories based on the literal category values."
    }
  },
  
  // Inventory - Iceberg table
  {
    id: "inventory",
    name: "inventory",
    format: "iceberg",
    path: "s3://demo-bucket/data/inventory",
    tableInfo: {
      format: "Iceberg (v2)",
      location: "s3://demo-bucket/data/inventory",
      uuid: "cd32ef1a-b78d-4f21-a890-342c9876ef12",
      created: "2023-05-20 10:15:22",
      lastModified: "2023-08-10 09:12:45",
      partitionFields: "warehouse_id (integer), update_date (date)"
    },
    metrics: {
      totalFiles: 18,
      totalSize: "850 MB",
      rowCount: "3.2M",
      snapshots: 5,
      compressionRatio: 82
    },
    columns: [
      { id: 1, name: "inventory_id", type: "integer", nullable: false, description: "Primary key" },
      { id: 2, name: "product_id", type: "integer", nullable: false, description: "Foreign key to products" },
      { id: 3, name: "warehouse_id", type: "integer", nullable: false, description: "Warehouse ID (partition field)", partitionField: true },
      { id: 4, name: "quantity", type: "integer", nullable: false, description: "Current quantity" },
      { id: 5, name: "restock_level", type: "integer", nullable: true, description: "Restock threshold" },
      { id: 6, name: "update_date", type: "date", nullable: false, description: "Last update date (partition field)", partitionField: true }
    ],
    partitions: [],
    snapshots: [],
    partitionDistribution: [],
    recentActivity: [],
    schemaHistory: [],
    previewData: [],
    metadataFiles: {
      metadataFiles: [],
      manifestFiles: [],
      metadataContent: {}
    },
    partitionSpec: {
      fields: "warehouse_id : integer (identity transform), update_date : date (day transform)",
      strategy: "The table is partitioned by warehouse_id (identity) and update_date (day). This creates a hierarchical directory structure grouping records first by warehouse and then by day."
    }
  },
  
  // Parquet tables
  {
    id: "customer",
    name: "customer",
    format: "parquet",
    path: "s3://demo-bucket/data/customer",
    tableInfo: {
      format: "Parquet",
      location: "s3://demo-bucket/data/customer",
      created: "2023-04-10 08:45:12",
      lastModified: "2023-07-15 16:22:33",
      partitionFields: "region (string)"
    },
    metrics: {
      totalFiles: 12,
      totalSize: "750 MB",
      rowCount: "2.8M",
      snapshots: 0,
      compressionRatio: 78
    },
    columns: [
      { id: 1, name: "customer_id", type: "integer", nullable: false, description: "Primary key" },
      { id: 2, name: "name", type: "string", nullable: false, description: "Customer name" },
      { id: 3, name: "email", type: "string", nullable: false, description: "Customer email" },
      { id: 4, name: "region", type: "string", nullable: false, description: "Customer region (partition field)", partitionField: true },
      { id: 5, name: "signup_date", type: "date", nullable: false, description: "Registration date" },
      { id: 6, name: "last_order_date", type: "date", nullable: true, description: "Last order date" },
      { id: 7, name: "total_orders", type: "integer", nullable: false, description: "Total number of orders" }
    ],
    partitions: [],
    snapshots: [],
    partitionDistribution: [],
    recentActivity: [],
    schemaHistory: [],
    previewData: [],
    metadataFiles: {
      metadataFiles: [],
      manifestFiles: [],
      metadataContent: {}
    },
    partitionSpec: {
      fields: "region : string (identity transform)",
      strategy: "The parquet files are organized in directories by region."
    }
  },
  
  {
    id: "orders",
    name: "orders",
    format: "parquet",
    path: "s3://demo-bucket/data/orders",
    tableInfo: {
      format: "Parquet",
      location: "s3://demo-bucket/data/orders",
      created: "2023-04-12 09:30:45",
      lastModified: "2023-08-02 11:18:52",
      partitionFields: "order_date (date), status (string)"
    },
    metrics: {
      totalFiles: 28,
      totalSize: "1.8 GB",
      rowCount: "5.4M",
      snapshots: 0,
      compressionRatio: 80
    },
    columns: [
      { id: 1, name: "order_id", type: "integer", nullable: false, description: "Primary key" },
      { id: 2, name: "customer_id", type: "integer", nullable: false, description: "Foreign key to customers" },
      { id: 3, name: "order_date", type: "date", nullable: false, description: "Order date (partition field)", partitionField: true },
      { id: 4, name: "status", type: "string", nullable: false, description: "Order status (partition field)", partitionField: true },
      { id: 5, name: "total_amount", type: "decimal(12,2)", nullable: false, description: "Total order amount" },
      { id: 6, name: "payment_method", type: "string", nullable: false, description: "Payment method used" }
    ],
    partitions: [],
    snapshots: [],
    partitionDistribution: [],
    recentActivity: [],
    schemaHistory: [],
    previewData: [],
    metadataFiles: {
      metadataFiles: [],
      manifestFiles: [],
      metadataContent: {}
    },
    partitionSpec: {
      fields: "order_date : date (year-month transform), status : string (identity transform)",
      strategy: "Files are organized by order date (year/month) and then by order status."
    }
  },
  
  // Delta table
  {
    id: "transactions",
    name: "transactions",
    format: "delta",
    path: "s3://demo-bucket/data/transactions",
    tableInfo: {
      format: "Delta Lake",
      location: "s3://demo-bucket/data/transactions",
      created: "2023-05-05 14:22:30",
      lastModified: "2023-08-15 08:17:42",
      partitionFields: "transaction_date (date)"
    },
    metrics: {
      totalFiles: 32,
      totalSize: "2.2 GB",
      rowCount: "7.1M",
      snapshots: 12,
      compressionRatio: 88
    },
    columns: [
      { id: 1, name: "transaction_id", type: "string", nullable: false, description: "Primary key" },
      { id: 2, name: "order_id", type: "integer", nullable: false, description: "Related order" },
      { id: 3, name: "transaction_date", type: "date", nullable: false, description: "Transaction date (partition field)", partitionField: true },
      { id: 4, name: "amount", type: "decimal(12,2)", nullable: false, description: "Transaction amount" },
      { id: 5, name: "currency", type: "string", nullable: false, description: "Currency code" },
      { id: 6, name: "status", type: "string", nullable: false, description: "Transaction status" },
      { id: 7, name: "payment_provider", type: "string", nullable: false, description: "Payment provider" }
    ],
    partitions: [],
    snapshots: [],
    partitionDistribution: [],
    recentActivity: [],
    schemaHistory: [],
    previewData: [],
    metadataFiles: {
      metadataFiles: [],
      manifestFiles: [],
      metadataContent: {}
    },
    partitionSpec: {
      fields: "transaction_date : date (day transform)",
      strategy: "Delta Lake transaction log tracks changes with files partitioned by day."
    }
  },
  
  // Hudi table
  {
    id: "users",
    name: "users",
    format: "hudi",
    path: "s3://demo-bucket/data/users",
    tableInfo: {
      format: "Hudi",
      location: "s3://demo-bucket/data/users",
      created: "2023-03-20 11:30:15",
      lastModified: "2023-08-12 14:25:38",
      partitionFields: "country (string), signup_year (integer)"
    },
    metrics: {
      totalFiles: 22,
      totalSize: "1.4 GB",
      rowCount: "4.2M",
      snapshots: 8,
      compressionRatio: 82
    },
    columns: [
      { id: 1, name: "user_id", type: "string", nullable: false, description: "Primary key" },
      { id: 2, name: "username", type: "string", nullable: false, description: "User's username" },
      { id: 3, name: "email", type: "string", nullable: false, description: "User's email" },
      { id: 4, name: "country", type: "string", nullable: false, description: "User's country (partition field)", partitionField: true },
      { id: 5, name: "signup_date", type: "date", nullable: false, description: "Registration date" },
      { id: 6, name: "signup_year", type: "integer", nullable: false, description: "Registration year (partition field)", partitionField: true },
      { id: 7, name: "last_login", type: "timestamp", nullable: true, description: "Last login timestamp" },
      { id: 8, name: "account_status", type: "string", nullable: false, description: "Account status" }
    ],
    partitions: [],
    snapshots: [],
    partitionDistribution: [],
    recentActivity: [],
    schemaHistory: [],
    previewData: [],
    metadataFiles: {
      metadataFiles: [],
      manifestFiles: [],
      metadataContent: {}
    },
    partitionSpec: {
      fields: "country : string (identity transform), signup_year : integer (identity transform)",
      strategy: "Hudi uses copy-on-write table with records partitioned by country and signup year."
    }
  }
];
