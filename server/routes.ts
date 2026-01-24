import type { Express } from "express";
import type { Server } from "http";
import { setupAuth } from "./auth"; // We'll assume auth.ts handles passport setup
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { machinery, manpower } from "@shared/schema";
import { db } from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth setup (if you have server/auth.ts, otherwise handle here)
  setupAuth(app); // Assumed to exist or I will create it

  // Machinery
  app.get(api.machinery.list.path, async (req, res) => {
    const items = await storage.getMachinery();
    res.json(items);
  });

  app.get(api.machinery.get.path, async (req, res) => {
    const item = await storage.getMachineryItem(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  });

  // Manpower
  app.get(api.manpower.list.path, async (req, res) => {
    const items = await storage.getManpower();
    res.json(items);
  });

  // Weather (Mock)
  app.get(api.weather.get.path, (req, res) => {
    // Mock response for Gujarat/India
    res.json({
      location: req.query.location || "Gujarat, India",
      temp: 32,
      condition: "Sunny",
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: "Mon", temp: 33, condition: "Sunny" },
        { day: "Tue", temp: 31, condition: "Cloudy" },
        { day: "Wed", temp: 30, condition: "Rain" },
      ],
      advisory: "Ideal conditions for cotton sowing. Ensure irrigation for vegetables.",
    });
  });

  // Yield Prediction (Mock)
  app.post(api.prediction.predict.path, (req, res) => {
    const { crop, area } = req.body;
    // Simple mock logic
    const yieldPerAcre = crop.toLowerCase().includes("wheat") ? 15 : 20;
    const total = yieldPerAcre * area;
    res.json({
      predictedYield: `${total}-${total + 5} Quintals`,
      confidence: 85,
    });
  });

  // Prices (Mock)
  app.get(api.prices.list.path, (req, res) => {
    res.json([
      { crop: "Wheat", price: 2100, market: "Rajkot APMC", trend: "up" },
      { crop: "Cotton", price: 6500, market: "Amreli APMC", trend: "stable" },
      { crop: "Groundnut", price: 5800, market: "Junagadh APMC", trend: "down" },
      { crop: "Onion", price: 1200, market: "Bhavnagar APMC", trend: "up" },
      { crop: "Potato", price: 900, market: "Deesa APMC", trend: "stable" },
    ]);
  });
  
  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingMachinery = await storage.getMachinery();
  if (existingMachinery.length === 0) {
    await db.insert(machinery).values([
      { name: "John Deere 5310", type: "Tractor", dailyRent: 1500, imageUrl: "https://images.unsplash.com/photo-1592323459384-91f868c2d583?auto=format&fit=crop&q=80" },
      { name: "Mahindra 575 DI", type: "Tractor", dailyRent: 1200, imageUrl: "https://images.unsplash.com/photo-1530267981375-24de203130f6?auto=format&fit=crop&q=80" },
      { name: "Kubota Harvester", type: "Harvester", dailyRent: 4000, imageUrl: "https://images.unsplash.com/photo-1563606677987-2d415d8623b3?auto=format&fit=crop&q=80" },
      { name: "Rotavator 6ft", type: "Implement", dailyRent: 500, imageUrl: "https://images.unsplash.com/photo-1595247920367-154dfb13ac09?auto=format&fit=crop&q=80" },
      { name: "Sonalika 745", type: "Tractor", dailyRent: 1300, imageUrl: "https://images.unsplash.com/photo-1517512006864-7edc30c42044?auto=format&fit=crop&q=80" },
      { name: "Drone Sprayer", type: "Sprayer", dailyRent: 2000, imageUrl: "https://images.unsplash.com/photo-1581093588401-fbb07366f8e6?auto=format&fit=crop&q=80" },
      { name: "Hydraulic Trailer", type: "Trailer", dailyRent: 300, imageUrl: "https://images.unsplash.com/photo-1621981386829-9b788a80436d?auto=format&fit=crop&q=80" },
      { name: "Thresher Machine", type: "Thresher", dailyRent: 800, imageUrl: "https://images.unsplash.com/photo-1590248238692-a9b2d3525281?auto=format&fit=crop&q=80" },
    ]);
  }

  const existingManpower = await storage.getManpower();
  if (existingManpower.length === 0) {
    await db.insert(manpower).values([
      { name: "Ramesh Bhai", role: "Driver", experience: "5 years", dailyRate: 500, location: "Rajkot" },
      { name: "Suresh Kumar", role: "Laborer", experience: "10 years", dailyRate: 350, location: "Amreli" },
      { name: "Mahesh Patel", role: "Supervisor", experience: "8 years", dailyRate: 700, location: "Junagadh" },
      { name: "Dinesh Solanki", role: "Driver", experience: "3 years", dailyRate: 450, location: "Bhavnagar" },
      { name: "Vijay Rathod", role: "Laborer", experience: "2 years", dailyRate: 300, location: "Surat" },
      { name: "Kishan Gohel", role: "Sprayer", experience: "4 years", dailyRate: 400, location: "Vadodara" },
      { name: "Anil Makwana", role: "Harvester Op", experience: "6 years", dailyRate: 800, location: "Ahmedabad" },
      { name: "Raju Bharwad", role: "Laborer", experience: "1 year", dailyRate: 300, location: "Patan" },
    ]);
  }
}
