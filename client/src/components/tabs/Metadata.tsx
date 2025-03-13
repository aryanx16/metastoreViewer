import React, { useState } from "react";
import { TableMetadata } from "@shared/types";

interface MetadataProps {
  tableData: TableMetadata;
}

export default function Metadata({ tableData }: MetadataProps) {
  const [metadataFile, setMetadataFile] = useState<string>("v7");
  
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
          <h3 className="text-lg font-medium mb-3">Metadata Files</h3>
          <div className="overflow-y-auto max-h-80">
            <div className="tree-view text-sm">
              <ul className="list-none pl-0">
                <li className="relative pl-5">
                  metadata/
                  <ul className="list-none pl-6">
                    {tableData.metadataFiles.metadataFiles.map((file, idx) => (
                      <li key={idx} className="relative pl-5">{file}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
          <h3 className="text-lg font-medium mb-3">Manifest Files</h3>
          <div className="overflow-y-auto max-h-80">
            <div className="tree-view text-sm">
              <ul className="list-none pl-0">
                <li className="relative pl-5">
                  metadata/
                  <ul className="list-none pl-6">
                    <li className="relative pl-5">
                      manifests/
                      <ul className="list-none pl-6">
                        {tableData.metadataFiles.manifestFiles.map((file, idx) => (
                          <li key={idx} className="relative pl-5">{file.split('/').pop()}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {Object.keys(tableData.metadataFiles.metadataContent).length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Metadata File Content</h3>
            <div>
              <select 
                className="text-sm border border-neutral-300 rounded py-1 px-2"
                value={metadataFile}
                onChange={(e) => setMetadataFile(e.target.value)}
              >
                {Object.keys(tableData.metadataFiles.metadataContent).map((file) => (
                  <option key={file} value={file}>
                    {file}.metadata.json
                  </option>
                ))}
                {tableData.metadataFiles.manifestFiles.length > 0 && (
                  <option value="manifestList">manifest_list.avro</option>
                )}
              </select>
            </div>
          </div>
          <div className="bg-neutral-800 text-white p-4 rounded overflow-x-auto">
            <pre className="code-viewer text-xs whitespace-pre-wrap overflow-x-auto">
              {tableData.metadataFiles.metadataContent[metadataFile] || "Content not available"}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
