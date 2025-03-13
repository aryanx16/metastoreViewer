import React, { useState } from 'react';
import { TableMetadata, TablePartition } from '@shared/schema';
import { formatBytes, formatLargeNumber } from '@/lib/formatUtils';

interface PartitionViewerProps {
  metadata: TableMetadata;
  isPreview?: boolean;
}

export default function PartitionViewer({ metadata, isPreview = false }: PartitionViewerProps) {
  const partitions = metadata.partitions || [];
  const [expandedPartitions, setExpandedPartitions] = useState<Record<string, boolean>>({});
  
  // Toggle partition expansion
  const togglePartition = (partitionId: string) => {
    setExpandedPartitions(prev => ({
      ...prev,
      [partitionId]: !prev[partitionId]
    }));
  };
  
  // If no partition data, show empty state
  if (!partitions.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 mb-6 p-8 text-center">
        <div className="text-3xl text-neutral-400 mb-2">
          <i className="ri-table-line"></i>
        </div>
        <h3 className="text-lg font-medium text-neutral-700">No Partition Information</h3>
        <p className="text-neutral-500 mt-1">This table does not appear to be partitioned, or partition information is unavailable.</p>
      </div>
    );
  }
  
  // Find partition keys from schema
  const partitionKeys = metadata.schema?.fields
    .filter(field => field.partitionKey)
    .map(field => field.name) || [];
  
  // For preview mode, show a limited view
  if (isPreview) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 mb-6">
        <div className="flex justify-between items-center p-4 border-b border-neutral-200">
          <h2 className="text-base font-medium">Partition Layout</h2>
          <div className="flex space-x-2">
            <button className="text-sm text-neutral-600 flex items-center hover:text-primary">
              <i className="ri-pie-chart-line mr-1"></i>
              Visualize
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Partition Strategy Info */}
          <div className="mb-4 p-3 bg-neutral-50 rounded-md">
            <h3 className="text-sm font-medium mb-2">Partition Strategy</h3>
            <div className="text-sm text-neutral-600">
              <p><span className="font-medium">Fields:</span> {partitionKeys.join(', ') || 'None'}</p>
              <p><span className="font-medium">Strategy:</span> {partitionKeys.length > 0 ? 'Identity partitioning' : 'No partitioning'}</p>
              <p><span className="font-medium">Total Partitions:</span> {partitions.length}</p>
            </div>
          </div>
          
          {/* Preview of partitions */}
          <div className="border border-neutral-200 rounded-md overflow-hidden">
            <div className="bg-neutral-50 p-2 border-b border-neutral-200 flex justify-between items-center">
              <span className="text-xs font-medium">Partition</span>
              <span className="text-xs font-medium">Size</span>
            </div>
            <div className="max-h-32 overflow-y-auto">
              {partitions.slice(0, 3).map((partition, index) => (
                <div key={`${partition.name}-${partition.value}`} className="p-2 border-b border-neutral-100 flex justify-between">
                  <span className="text-sm">{partition.name}={partition.value}</span>
                  <span className="text-sm text-neutral-500">{partition.size ? formatBytes(partition.size) : 'Unknown'}</span>
                </div>
              ))}
              {partitions.length > 3 && (
                <div className="p-2 text-center text-sm text-primary">
                  {partitions.length - 3} more partitions...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Full partition viewer
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 mb-6">
      <div className="flex justify-between items-center p-4 border-b border-neutral-200">
        <h2 className="text-base font-medium">Partition Layout</h2>
        <div className="flex space-x-2">
          <button className="text-sm text-neutral-600 flex items-center hover:text-primary">
            <i className="ri-pie-chart-line mr-1"></i>
            Visualize
          </button>
          <button className="text-sm text-neutral-600 flex items-center hover:text-primary">
            <i className="ri-file-chart-line mr-1"></i>
            Analyze Distribution
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Partition Strategy Info */}
        <div className="mb-4 p-3 bg-neutral-50 rounded-md">
          <h3 className="text-sm font-medium mb-2">Partition Strategy</h3>
          <div className="text-sm text-neutral-600">
            <p><span className="font-medium">Fields:</span> {partitionKeys.join(', ') || 'None'}</p>
            <p><span className="font-medium">Strategy:</span> {
              metadata.format === 'iceberg' 
                ? 'Identity hash partitioning' 
                : metadata.format === 'hudi'
                  ? 'Hudi partitioning'
                  : 'Identity partitioning'
            }</p>
            <p><span className="font-medium">Total Partitions:</span> {partitions.length}</p>
          </div>
        </div>
        
        {/* Partition Explorer */}
        <div>
          <h3 className="text-sm font-medium mb-2">Partition Explorer</h3>
          <div className="border border-neutral-200 rounded-md overflow-hidden">
            {/* Explorer Toolbar */}
            <div className="bg-neutral-50 border-b border-neutral-200 p-2 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <button className="p-1 rounded hover:bg-neutral-200 text-neutral-700">
                  <i className="ri-refresh-line"></i>
                </button>
                <button className="p-1 rounded hover:bg-neutral-200 text-neutral-700">
                  <i className="ri-search-line"></i>
                </button>
                <button className="p-1 rounded hover:bg-neutral-200 text-neutral-700">
                  <i className="ri-filter-line"></i>
                </button>
              </div>
              <div className="text-xs text-neutral-500">
                Showing top partitions by size
              </div>
            </div>
            
            {/* Partition Tree View */}
            <div className="max-h-96 overflow-y-auto">
              {partitions.map((partition) => {
                const partitionId = `${partition.name}-${partition.value}`;
                const isExpanded = expandedPartitions[partitionId];
                const hasChildren = partition.children && partition.children.length > 0;
                
                return (
                  <React.Fragment key={partitionId}>
                    <div 
                      className={`p-1.5 border-b border-neutral-100 ${isExpanded ? 'bg-blue-50' : 'hover:bg-blue-50'} cursor-pointer`}
                      onClick={() => hasChildren && togglePartition(partitionId)}
                    >
                      <div className="flex items-center">
                        {hasChildren ? (
                          <i className={`${isExpanded ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'} text-neutral-${isExpanded ? '600' : '400'} mx-1`}></i>
                        ) : (
                          <span className="w-5"></span>
                        )}
                        <span className={`text-sm ml-1 ${isExpanded ? 'font-medium' : ''}`}>
                          {partition.name}={partition.value}
                        </span>
                        <span className="ml-auto text-xs text-neutral-500">
                          {hasChildren 
                            ? `${partition.children?.length} partitions` 
                            : partition.size 
                              ? formatBytes(partition.size)
                              : partition.rowCount
                                ? `${formatLargeNumber(partition.rowCount)} rows`
                                : ''}
                        </span>
                      </div>
                    </div>
                    {isExpanded && partition.children && partition.children.map((child) => (
                      <div 
                        key={`${child.name}-${child.value}`}
                        className="pl-8 p-1.5 border-b border-neutral-100 hover:bg-blue-50"
                      >
                        <div className="flex items-center">
                          <span className="text-sm">{child.name}={child.value}</span>
                          <span className="ml-auto text-xs text-neutral-500">
                            {child.size ? formatBytes(child.size) : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
