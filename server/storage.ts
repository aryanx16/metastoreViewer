import { users, type User, type InsertUser, tables, type Table, type InsertTable } from "@shared/schema";
import { TableMetadata, TableFormat } from "@shared/types";
import { mockTablesData } from "./data/mockData";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Table metadata methods
  getAllTables(): Promise<TableMetadata[]>;
  getTablesByFormat(format: TableFormat): Promise<TableMetadata[]>;
  getTableById(id: string): Promise<TableMetadata | undefined>;
  getTableByName(name: string): Promise<TableMetadata | undefined>;
  getDataSources(): Promise<{ value: string; label: string }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tables: Map<string, TableMetadata>;
  private dataSources: { value: string; label: string }[];
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    
    // Initialize with mock data
    this.tables = new Map();
    mockTablesData.forEach(table => {
      this.tables.set(table.id, table);
    });
    
    // Mock data sources
    this.dataSources = [
      { value: "s3://demo-bucket", label: "s3://demo-bucket" },
      { value: "azure://demo-container", label: "azure://demo-container" },
      { value: "minio://demo", label: "minio://demo" }
    ];
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAllTables(): Promise<TableMetadata[]> {
    return Array.from(this.tables.values());
  }
  
  async getTablesByFormat(format: TableFormat): Promise<TableMetadata[]> {
    return Array.from(this.tables.values())
      .filter(table => table.format === format);
  }
  
  async getTableById(id: string): Promise<TableMetadata | undefined> {
    return this.tables.get(id);
  }
  
  async getTableByName(name: string): Promise<TableMetadata | undefined> {
    return Array.from(this.tables.values())
      .find(table => table.name === name);
  }
  
  async getDataSources(): Promise<{ value: string; label: string }[]> {
    return this.dataSources;
  }
}

export const storage = new MemStorage();
