import { Router } from 'express';
import { pool } from '../db';

const r = Router();

// GET /prestataires?role=&active=
r.get('/', async (req, res) => {
  const { role, active } = req.query;
  const where: string[] = [];
  const params: any[] = [];
  if (role) { params.push(role); where.push(`role = $${params.length}`); }
  if (active !== undefined) { params.push(active === 'true'); where.push(`active = $${params.length}`); }
  const sql = `SELECT * FROM prestataires ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY last_name, first_name`;
  const { rows } = await pool.query(sql, params);
  res.json(rows);
});

// POST /prestataires
r.post('/', async (req, res) => {
  const { first_name, last_name, phone, email, company, role, active = true } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO prestataires (first_name,last_name,phone,email,company,role,active)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [first_name, last_name, phone, email, company, role, active]
  );
  res.status(201).json(rows[0]);
});

// GET /prestataires/:id
r.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM prestataires WHERE id=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// PUT /prestataires/:id
r.put('/:id', async (req, res) => {
  const { first_name, last_name, phone, email, company, role, active } = req.body;
  const { rows } = await pool.query(
    `UPDATE prestataires 
     SET first_name=$1,last_name=$2,phone=$3,email=$4,company=$5,role=$6,active=$7
     WHERE id=$8 RETURNING *`,
    [first_name, last_name, phone, email, company, role, active, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// DELETE /prestataires/:id
r.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM prestataires WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

export default r;
