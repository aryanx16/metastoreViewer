import React, { useState } from 'react';

interface PathInputProps {
  onFetch: (path: string) => void;
  initialPath?: string;
}

export default function PathInput({ onFetch, initialPath = '' }: PathInputProps) {
  const [path, setPath] = useState(initialPath);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (path.trim()) {
      onFetch(path.trim());
    }
  };
  
  return (
    <div className="bg-white border-b border-neutral-200 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex-grow">
          <div className="flex bg-neutral-50 border border-neutral-300 rounded-md overflow-hidden">
            <div className="bg-neutral-100 px-3 py-2 border-r border-neutral-300 text-neutral-600 text-sm">
              S3 Path
            </div>
            <input 
              type="text" 
              className="flex-grow px-3 py-2 text-sm focus:outline-none"
              value={path} 
              onChange={(e) => setPath(e.target.value)}
              placeholder="Enter S3 bucket path..."
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            type="submit"
            className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Fetch Metadata
          </button>
          <div className="relative">
            <button 
              type="button"
              className="bg-white border border-neutral-300 hover:bg-neutral-50 px-4 py-2 rounded-md text-sm font-medium text-neutral-700 transition-colors flex items-center"
            >
              <i className="ri-filter-line mr-1"></i>
              Filter
              <i className="ri-arrow-down-s-line ml-1"></i>
            </button>
            {/* Dropdown menu would be here */}
          </div>
        </div>
      </form>
    </div>
  );
}
