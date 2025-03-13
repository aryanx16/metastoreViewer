import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "remixicon/fonts/remixicon.css";

try {
  // Wait for DOM content to be fully loaded
  const renderApp = () => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      createRoot(rootElement).render(<App />);
      console.log("React app mounted successfully");
    } else {
      console.error("Failed to find the root element");
    }
  };

  // Check if DOM is already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderApp);
  } else {
    renderApp();
  }
} catch (error) {
  console.error("Error during application initialization:", error);
}
