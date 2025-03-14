
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TableMetadata } from '@shared/schema';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface FilesViewerProps {
  metadata: TableMetadata;
}

export default function FilesViewer({ metadata }: FilesViewerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const fileAnalysis = {
    totalFiles: 19,
    totalRecords: 2240282,
    avgRecordsPerFile: 117910,
    avgFileSize: "8.04 MB",
    distributions: {
      fileSize: [
        { range: "0-1 MB", files: 40, percentage: 30 },
        { range: "1-5 MB", files: 70, percentage: 45 },
        { range: "5-10 MB", files: 35, percentage: 25 },
        { range: "10-20 MB", files: 15, percentage: 10 },
        { range: "20+ MB", files: 5, percentage: 5 }
      ],
      recordCount: [
        { range: "0-1K", files: 20, percentage: 10 },
        { range: "1K-10K", files: 45, percentage: 25 },
        { range: "10K-50K", files: 60, percentage: 30 },
        { range: "50K-100K", files: 70, percentage: 35 },
        { range: "100K+", files: 40, percentage: 20 }
      ],
      fileTypes: [
        { name: 'parquet', value: 30 },
        { name: 'avro', value: 28 },
        { name: 'orc', value: 42 }
      ]
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">File Analysis</h2>
        <div className="flex justify-between items-center mb-4">
          <Input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <select className="border rounded p-2">
            <option>Sort by Records</option>
            <option>Sort by Size</option>
            <option>Sort by Name</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Files</div>
            <div className="text-2xl font-bold">{fileAnalysis.totalFiles}</div>
            <div className="text-xs text-gray-500">Number of data files</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Total Records</div>
            <div className="text-2xl font-bold">{fileAnalysis.totalRecords.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Across all files</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Avg Records/File</div>
            <div className="text-2xl font-bold">{fileAnalysis.avgRecordsPerFile.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Average records per file</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600">Avg File Size</div>
            <div className="text-2xl font-bold">{fileAnalysis.avgFileSize}</div>
            <div className="text-xs text-gray-500">Average size in MB</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-semibold mb-2">File Size Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fileAnalysis.distributions.fileSize}>
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="files" fill="#0088FE" name="Number of Files" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-semibold mb-2">Record Count Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fileAnalysis.distributions.recordCount}>
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="files" fill="#00C49F" name="Number of Files" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-semibold p-4 border-b">File Type Distribution</h3>
          <div className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fileAnalysis.distributions.fileTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value}%)`}
                  >
                    {fileAnalysis.distributions.fileTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
