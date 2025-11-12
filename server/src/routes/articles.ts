import { Router } from 'express';
import { pool } from '../db';

const r = Router();

// GET /articles?status=&search=
r.get('/', async (req, res) => {
  const { status, search } = req.query;
  const clauses: string[] = [];
  const params: any[] = [];
  if (status) { params.push(status); clauses.push(`status = $${params.length}`); }
  if (search) { params.push(`%${search}%`); clauses.push(`(name ILIKE $${params.length} OR sku ILIKE $${params.length})`); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const { rows } = await pool.query(`SELECT * FROM articles ${where} ORDER BY name`, params);
  res.json(rows);
});

// POST /articles
r.post('/', async (req, res) => {
  const { sku, name, description, notes } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO articles (sku,name,description,notes) VALUES ($1,$2,$3,$4) RETURNING *`,
    [sku, name, description, notes]
  );
  res.status(201).json(rows[0]);
});

// GET /articles/:id
r.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM articles WHERE id=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// PUT /articles/:id
r.put('/:id', async (req, res) => {
  const { sku, name, description, status, status_reason, notes } = req.body;
  const { rows } = await pool.query(
    `UPDATE articles SET sku=$1,name=$2,description=$3,status=$4,status_reason=$5,notes=$6
     WHERE id=$7 RETURNING *`,
    [sku, name, description, status, status_reason, notes, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// POST /articles/:id/status
r.post('/:id/status', async (req, res) => {
  const { status, reason } = req.body;
  const { rows } = await pool.query(
    `UPDATE articles SET status=$1,status_reason=$2 WHERE id=$3 RETURNING *`,
    [status, reason, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

export default r;
