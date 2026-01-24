import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("farmer"), // farmer, admin
  govId: text("gov_id"), // Government proof ID
});

export const machinery = pgTable("machinery", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // Tractor, Harvester, etc.
  dailyRent: integer("daily_rent").notNull(), // In INR
  imageUrl: text("image_url").notNull(),
  available: boolean("available").default(true),
});

export const manpower = pgTable("manpower", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // Laborer, Driver, etc.
  experience: text("experience").notNull(),
  dailyRate: integer("daily_rate").notNull(), // In INR
  available: boolean("available").default(true),
  location: text("location"),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertMachinerySchema = createInsertSchema(machinery).omit({ id: true });
export const insertManpowerSchema = createInsertSchema(manpower).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Machinery = typeof machinery.$inferSelect;
export type Manpower = typeof manpower.$inferSelect;

export type YieldPredictionRequest = {
  crop: string;
  area: number; // in acres
  location: string;
};

export type YieldPredictionResponse = {
  predictedYield: string; // e.g. "45-50 Quintals"
  confidence: number;
};
