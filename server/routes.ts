import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { TableFormat } from "@shared/types";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the metastore viewer

  // Get all data sources
  app.get("/api/datasources", async (req, res) => {
    try {
      const dataSources = await storage.getDataSources();
      res.json(dataSources);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data sources" });
    }
  });

  // Get all tables
  app.get("/api/tables", async (req, res) => {
    try {
      const tables = await storage.getAllTables();
      res.json(tables);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tables" });
    }
  });

  // Get tables by format
  app.get("/api/tables/format/:format", async (req, res) => {
    try {
      const format = req.params.format as TableFormat;
      const tables = await storage.getTablesByFormat(format);
      res.json(tables);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tables by format" });
    }
  });

  // Get table by ID
  app.get("/api/tables/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const table = await storage.getTableById(id);
      
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      
      res.json(table);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch table" });
    }
  });

  // Get table preview data
  app.get("/api/tables/:id/preview", async (req, res) => {
    try {
      const id = req.params.id;
      const table = await storage.getTableById(id);
      
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      
      res.json(table.previewData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch preview data" });
    }
  });

  // Get table schema
  app.get("/api/tables/:id/schema", async (req, res) => {
    try {
      const id = req.params.id;
      const table = await storage.getTableById(id);
      
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      
      res.json({
        columns: table.columns,
        schemaHistory: table.schemaHistory
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schema" });
    }
  });

  // Get table partitions
  app.get("/api/tables/:id/partitions", async (req, res) => {
    try {
      const id = req.params.id;
      const table = await storage.getTableById(id);
      
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      
      res.json({
        partitions: table.partitions,
        partitionSpec: table.partitionSpec,
        partitionDistribution: table.partitionDistribution
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch partitions" });
    }
  });

  // Get table snapshots
  app.get("/api/tables/:id/snapshots", async (req, res) => {
    try {
      const id = req.params.id;
      const table = await storage.getTableById(id);
      
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      
      res.json({
        snapshots: table.snapshots,
        recentActivity: table.recentActivity
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch snapshots" });
    }
  });

  // Get table metadata files
  app.get("/api/tables/:id/metadata", async (req, res) => {
    try {
      const id = req.params.id;
      const table = await storage.getTableById(id);
      
      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }
      
      res.json(table.metadataFiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metadata files" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
