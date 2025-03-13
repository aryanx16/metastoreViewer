import React from "react";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17Z" stroke="currentColor" strokeWidth="2" />
            <path d="M9 9H15M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h1 className="text-xl font-semibold">Metastore Viewer</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1 rounded hover:bg-secondary flex items-center">
            <span className="mdi mdi-information-outline mr-1"></span>
            <span>Help</span>
          </button>
          <button className="px-3 py-1 rounded hover:bg-secondary flex items-center">
            <span className="mdi mdi-cog-outline mr-1"></span>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}
