import { Router } from 'express';
import { pool } from '../db';

const r = Router();

// POST /validations/article-photo
r.post('/article-photo', async (req, res) => {
  const { session_id, article_id, validated_by_prestataire_id } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO validations (kind, session_id, target_article_id, validated_by_prestataire_id)
     VALUES ('article_studio_photo',$1,$2,$3) RETURNING *`,
    [session_id, article_id, validated_by_prestataire_id]
  );
  res.status(201).json(rows[0]);
});

// POST /validations/decor-photo
r.post('/decor-photo', async (req, res) => {
  const { session_id, decor_id, validated_by_prestataire_id } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO validations (kind, session_id, target_decor_id, validated_by_prestataire_id)
     VALUES ('decor_photo',$1,$2,$3) RETURNING *`,
    [session_id, decor_id, validated_by_prestataire_id]
  );
  res.status(201).json(rows[0]);
});

// POST /validations/decor-install
r.post('/decor-install', async (req, res) => {
  const { session_id, decor_id, validated_by_prestataire_id } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO validations (kind, session_id, target_decor_id, validated_by_prestataire_id)
     VALUES ('decor_install',$1,$2,$3) RETURNING *`,
    [session_id, decor_id, validated_by_prestataire_id]
  );
  res.status(201).json(rows[0]);
});

// POST /validations/decor-uninstall
r.post('/decor-uninstall', async (req, res) => {
  const { session_id, decor_id, validated_by_prestataire_id } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO validations (kind, session_id, target_decor_id, validated_by_prestataire_id)
     VALUES ('decor_uninstall',$1,$2,$3) RETURNING *`,
    [session_id, decor_id, validated_by_prestataire_id]
  );
  res.status(201).json(rows[0]);
});

export default r;
