
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TableMetadata } from '@shared/schema';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface FilesViewerProps {
  metadata: TableMetadata;
}

export default function FilesViewer({ metadata }: FilesViewerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const fileAnalysis = {
    totalFiles: metadata.fileCount || 0,
    totalRecords: metadata.rowCount || 0,
    avgRecordsPerFile: metadata.fileCount ? Math.round((metadata.rowCount || 0) / metadata.fileCount) : 0,
    avgFileSize: `${(metadata.size / (1024 * 1024 * metadata.fileCount)).toFixed(2)} MB`,
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
        { name: metadata.format, value: 100 }
      ]
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <Input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex items-center space-x-2">
          <select className="border border-gray-200 rounded px-2 py-1 text-sm">
            <option>Sort by Name</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Files</div>
          <div className="text-2xl font-semibold mt-1">{fileAnalysis.totalFiles}</div>
          <div className="text-xs text-gray-500 mt-1">Number of data files</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Records</div>
          <div className="text-2xl font-semibold mt-1">{fileAnalysis.totalRecords.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Across all files</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Avg Records/File</div>
          <div className="text-2xl font-semibold mt-1">{fileAnalysis.avgRecordsPerFile.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">Average records per file</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Avg File Size</div>
          <div className="text-2xl font-semibold mt-1">{fileAnalysis.avgFileSize}</div>
          <div className="text-xs text-gray-500 mt-1">Average size in MB</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold mb-4">File Size Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fileAnalysis.distributions.fileSize}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="files" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold mb-4">Record Count Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fileAnalysis.distributions.recordCount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="files" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold mb-4">File Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fileAnalysis.distributions.fileTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name} (${value}%)`}
                >
                  {fileAnalysis.distributions.fileTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold mb-2">File Metrics Summary</h3>
        <div className="text-xs text-gray-500 mb-4">Min, max, and average values</div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">File Size</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.5 MB</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25.3 MB</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fileAnalysis.avgFileSize}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Record Count</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">150,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fileAnalysis.avgRecordsPerFile.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
