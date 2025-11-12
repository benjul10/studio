import { Router } from 'express';
import { pool } from '../db';

const r = Router();

// GET /history/workdays?from=&to=
r.get('/workdays', async (req, res) => {
  const { from, to } = req.query;
  const params: any[] = [];
  const clauses: string[] = [];
  if (from) { params.push(from); clauses.push(`DATE(s.start_at) >= $${params.length}`); }
  if (to)   { params.push(to);   clauses.push(`DATE(s.start_at) <= $${params.length}`); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const { rows } = await pool.query(
    `SELECT DATE(s.start_at) AS jour, COUNT(*) AS nb_sessions
     FROM sessions s
     ${where}
     GROUP BY DATE(s.start_at)
     ORDER BY jour`,
    params
  );
  res.json(rows);
});

// GET /history/prestataires/:id/workdays?from=&to=
r.get('/prestataires/:id/workdays', async (req, res) => {
  const { id } = req.params;
  const { from, to } = req.query;
  const params: any[] = [id];
  const clauses: string[] = [`sp.prestataire_id = $1`];
  if (from) { params.push(from); clauses.push(`DATE(s.start_at) >= $${params.length}`); }
  if (to)   { params.push(to);   clauses.push(`DATE(s.start_at) <= $${params.length}`); }
  const where = `WHERE ${clauses.join(' AND ')}`;
  const { rows } = await pool.query(
    `SELECT DATE(s.start_at) AS jour, COUNT(*) AS nb_sessions
     FROM sessions s
     JOIN session_prestataires sp ON sp.session_id=s.id
     ${where}
     GROUP BY DATE(s.start_at)
     ORDER BY jour`,
    params
  );
  res.json(rows);
});

export default r;
