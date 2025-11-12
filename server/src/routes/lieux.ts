import { Router } from 'express';
import { pool } from '../db';

const r = Router();

// GET /lieux?type=
r.get('/', async (req, res) => {
  const { type } = req.query;
  const params: any[] = [];
  const where = type ? (params.push(type), 'WHERE type = $1') : '';
  const { rows } = await pool.query(`SELECT * FROM lieux ${where} ORDER BY name`, params);
  res.json(rows);
});

// POST /lieux
r.post('/', async (req, res) => {
  const { name, type, address, notes } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO lieux (name,type,address,notes) VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, type, address, notes]
  );
  res.status(201).json(rows[0]);
});

// GET /lieux/:id
r.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM lieux WHERE id=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// PUT /lieux/:id
r.put('/:id', async (req, res) => {
  const { name, type, address, notes } = req.body;
  const { rows } = await pool.query(
    `UPDATE lieux SET name=$1,type=$2,address=$3,notes=$4 WHERE id=$5 RETURNING *`,
    [name, type, address, notes, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// DELETE /lieux/:id
r.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM lieux WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

export default r;
