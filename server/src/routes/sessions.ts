import { Router } from 'express';
import { pool } from '../db';

const r = Router();

// GET /sessions?from=&to=&type=&lieu_id=
r.get('/', async (req, res) => {
  const { from, to, type, lieu_id } = req.query;
  const clauses: string[] = [];
  const params: any[] = [];
  if (from) { params.push(from); clauses.push(`start_at >= $${params.length}`); }
  if (to)   { params.push(to);   clauses.push(`end_at   <= $${params.length}`); }
  if (type) { params.push(type); clauses.push(`type     = $${params.length}`); }
  if (lieu_id) { params.push(lieu_id); clauses.push(`lieu_id = $${params.length}`); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const { rows } = await pool.query(`SELECT * FROM sessions ${where} ORDER BY start_at`, params);
  res.json(rows);
});

// POST /sessions
r.post('/', async (req, res) => {
  const { type, start_at, end_at, lieu_id, title, notes } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO sessions (type,start_at,end_at,lieu_id,title,notes)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [type, start_at, end_at, lieu_id, title, notes]
  );
  res.status(201).json(rows[0]);
});

// GET /sessions/:id
r.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM sessions WHERE id=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// PUT /sessions/:id
r.put('/:id', async (req, res) => {
  const { type, start_at, end_at, lieu_id, title, notes } = req.body;
  const { rows } = await pool.query(
    `UPDATE sessions 
     SET type=$1,start_at=$2,end_at=$3,lieu_id=$4,title=$5,notes=$6
     WHERE id=$7 RETURNING *`,
    [type, start_at, end_at, lieu_id, title, notes, req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ message: 'Not found' });
  res.json(rows[0]);
});

// DELETE /sessions/:id
r.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM sessions WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

// ---- Prestataires affectés à une session
r.get('/:id/prestataires', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT p.*, sp.role_attribution
     FROM session_prestataires sp
     JOIN prestataires p ON p.id=sp.prestataire_id
     WHERE sp.session_id=$1`,
    [req.params.id]
  );
  res.json(rows);
});

r.post('/:id/prestataires', async (req, res) => {
  const { prestataire_id, role_attribution } = req.body;
  await pool.query(
    `INSERT INTO session_prestataires (session_id,prestataire_id,role_attribution)
     VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,
    [req.params.id, prestataire_id, role_attribution]
  );
  res.status(204).end();
});

r.delete('/:id/prestataires/:prestataireId', async (req, res) => {
  await pool.query(
    'DELETE FROM session_prestataires WHERE session_id=$1 AND prestataire_id=$2',
    [req.params.id, req.params.prestataireId]
  );
  res.status(204).end();
});

// ---- Articles ciblés par une session
r.get('/:id/articles', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT a.* 
     FROM session_articles sa 
     JOIN articles a ON a.id=sa.article_id 
     WHERE sa.session_id=$1
     ORDER BY a.name`,
    [req.params.id]
  );
  res.json(rows);
});

r.post('/:id/articles', async (req, res) => {
  const { article_ids } = req.body as { article_ids: string[] };
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const aid of article_ids) {
      await client.query(
        `INSERT INTO session_articles (session_id,article_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
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

r.delete('/:id/articles/:articleId', async (req, res) => {
  await pool.query(
    'DELETE FROM session_articles WHERE session_id=$1 AND article_id=$2',
    [req.params.id, req.params.articleId]
  );
  res.status(204).end();
});

// ---- Décors ciblés par une session
r.get('/:id/decors', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT d.* 
     FROM session_decors sd 
     JOIN decors d ON d.id=sd.decor_id 
     WHERE sd.session_id=$1
     ORDER BY d.name`,
    [req.params.id]
  );
  res.json(rows);
});

r.post('/:id/decors', async (req, res) => {
  const { decor_ids } = req.body as { decor_ids: string[] };
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const did of decor_ids) {
      await client.query(
        `INSERT INTO session_decors (session_id,decor_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
        [req.params.id, did]
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

r.delete('/:id/decors/:decorId', async (req, res) => {
  await pool.query(
    'DELETE FROM session_decors WHERE session_id=$1 AND decor_id=$2',
    [req.params.id, req.params.decorId]
  );
  res.status(204).end();
});

export default r;
