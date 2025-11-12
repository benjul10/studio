import { Router } from 'express';
import { pool } from '../db';

const r = Router();

// GET /decors?search=
r.get('/', async (req, res) => {
  const { search } = req.query;
  const params: any[] = [];
  const where = search ? (params.push(`%${search}%`), 'WHERE name ILIKE $1') : '';
  const { rows } = await pool.query(`SELECT * FROM decors ${where} ORDER BY name`, params);
  res.json(rows);
});

// POST /decors
r.post('/', async (req, res) => {
  const { name, description, notes } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO decors (name,description,notes) VALUES ($1,$2,$3) RETURNING *`,
    [name, description, notes]
  );
  res.status(201).json(rows[0]);
});

// GET /decors/:id
r.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM decors WHERE id=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// PUT /decors/:id
r.put('/:id', async (req, res) => {
  const { name, description, notes } = req.body;
  const { rows } = await pool.query(
    `UPDATE decors SET name=$1,description=$2,notes=$3 WHERE id=$4 RETURNING *`,
    [name, description, notes, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// DELETE /decors/:id
r.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM decors WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

// GET /decors/:id/articles
r.get('/:id/articles', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT a.* 
     FROM decor_articles da 
     JOIN articles a ON a.id=da.article_id 
     WHERE da.decor_id=$1
     ORDER BY a.name`,
    [req.params.id]
  );
  res.json(rows);
});

// POST /decors/:id/articles
r.post('/:id/articles', async (req, res) => {
  const { article_ids } = req.body as { article_ids: string[] };
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const aid of article_ids) {
      await client.query(
        `INSERT INTO decor_articles (decor_id,article_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
        [req.params.id, aid]
      );
    }
    await client.query('COMMIT');
    res.status(204).end();
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
});

// DELETE /decors/:id/articles/:articleId
r.delete('/:id/articles/:articleId', async (req, res) => {
  await pool.query(
    'DELETE FROM decor_articles WHERE decor_id=$1 AND article_id=$2',
    [req.params.id, req.params.articleId]
  );
  res.status(204).end();
});

export default r;
