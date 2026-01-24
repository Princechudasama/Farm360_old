import { db } from "./db";
import {
  users, machinery, manpower,
  type User, type InsertUser,
  type Machinery, type Manpower
} from "@shared/schema";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  sessionStore: session.Store;
  // User
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Machinery
  getMachinery(): Promise<Machinery[]>;
  getMachineryItem(id: number): Promise<Machinery | undefined>;
  
  // Manpower
  getManpower(): Promise<Manpower[]>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Machinery
  async getMachinery(): Promise<Machinery[]> {
    return await db.select().from(machinery);
  }

  async getMachineryItem(id: number): Promise<Machinery | undefined> {
    const [item] = await db.select().from(machinery).where(eq(machinery.id, id));
    return item;
  }

  // Manpower
  async getManpower(): Promise<Manpower[]> {
    return await db.select().from(manpower);
  }
}

export const storage = new DatabaseStorage();
