import { Request, Response } from "express";
import { pool } from "../db/index";

export async function getTeams(req: Request, res: Response) {
  try {
    const db = await pool;
    const result = await db.request().query(`
      SELECT ID, TeamName FROM Team
      WHERE ID <> 1
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching teams:", err);
    res.status(500).json({ error: "Failed to fetch teams" });
  }
}