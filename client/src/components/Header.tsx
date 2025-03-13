import React from 'react';

export default function Header() {
  return (
    <header className="bg-white border-b border-neutral-200 px-4 py-2 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <div className="text-primary font-semibold text-xl mr-2">E6data</div>
        <div className="text-neutral-500 text-sm">Metastore Viewer</div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-neutral-600 hover:text-neutral-900" title="Settings">
          <i className="ri-settings-4-line text-lg"></i>
        </button>
        <button className="text-neutral-600 hover:text-neutral-900" title="Help">
          <i className="ri-question-line text-lg"></i>
        </button>
        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
          <span className="text-sm font-medium">JD</span>
        </div>
      </div>
    </header>
  );
}
