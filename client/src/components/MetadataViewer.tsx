import React from 'react';
import { TableMetadata } from '@shared/schema';
import TableFormatCard from './summary-cards/TableFormatCard';
import RowCountCard from './summary-cards/RowCountCard';
import StorageSizeCard from './summary-cards/StorageSizeCard';
import VersionCard from './summary-cards/VersionCard';
import SchemaViewer from './table-viewers/SchemaViewer';
import SchemaHistoryViewer from './table-viewers/SchemaHistoryViewer';
import PartitionViewer from './table-viewers/PartitionViewer';
import VersionViewer from './table-viewers/VersionViewer';
import PropertiesViewer from './table-viewers/PropertiesViewer';
import SampleDataViewer from './table-viewers/SampleDataViewer';

interface MetadataViewerProps {
  metadata: TableMetadata;
  activeTab: string;
  isLoading: boolean;
}

export default function MetadataViewer({ metadata, activeTab, isLoading }: MetadataViewerProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Overview tab with summary cards
  if (activeTab === 'overview') {
    return (
      <>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <TableFormatCard metadata={metadata} />
          <RowCountCard metadata={metadata} />
          <StorageSizeCard metadata={metadata} />
          <VersionCard metadata={metadata} />
        </div>
        
        {/* Schema Section */}
        <SchemaViewer metadata={metadata} isPreview={true} />
        
        {/* Schema History Preview (if versions exist) */}
        {metadata.versions && metadata.versions.length > 0 && (
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-medium">Schema History</h2>
                <a 
                  className="text-sm text-primary flex items-center" 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    const tabNav = document.querySelector('button[data-value="schema-history"]');
                    if (tabNav) (tabNav as HTMLButtonElement).click();
                  }}
                >
                  <i className="ri-history-line mr-1"></i>
                  View Full History
                </a>
              </div>
              
              <div className="text-sm text-neutral-600">
                <p>This table has {metadata.versions.length} recorded schema changes.</p>
                <p className="mt-1">Last updated: {metadata.versions[0]?.timestamp 
                  ? new Date(metadata.versions[0].timestamp).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })
                  : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Version History Preview */}
        <VersionViewer metadata={metadata} isPreview={true} />
        
        {/* Partition Layout Preview */}
        <PartitionViewer metadata={metadata} isPreview={true} />
        
        {/* Format Properties Preview */}
        <PropertiesViewer metadata={metadata} isPreview={true} />
      </>
    );
  }
  
  // Schema tab
  if (activeTab === 'schema') {
    return <SchemaViewer metadata={metadata} />;
  }
  
  // Schema History tab
  if (activeTab === 'schema-history') {
    return <SchemaHistoryViewer metadata={metadata} />;
  }
  
  // Partitions tab
  if (activeTab === 'partitions') {
    return <PartitionViewer metadata={metadata} />;
  }
  
  // Versions tab
  if (activeTab === 'versions') {
    return <VersionViewer metadata={metadata} />;
  }
  
  // Properties tab
  if (activeTab === 'properties') {
    return <PropertiesViewer metadata={metadata} />;
  }
  
  // Sample Data tab
  if (activeTab === 'sample-data') {
    return <SampleDataViewer metadata={metadata} />;
  }
  
  return null;
}
