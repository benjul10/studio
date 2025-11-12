CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE app_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','manager','operator'))
);

CREATE TABLE prestataires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  company TEXT,
  role TEXT NOT NULL CHECK (role IN (
    'photographe','assistant_photographe',
    'decorateur','assistant_decorateur',
    'chauffeur_assistant'
  )),
  active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE lieux (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('studio','maison')),
  address TEXT,
  notes TEXT
);

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku TEXT UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'ok' CHECK (status IN ('ok','abime','perdu')),
  status_reason TEXT,
  notes TEXT
);

CREATE TABLE decors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  notes TEXT
);

CREATE TABLE decor_articles (
  decor_id UUID NOT NULL REFERENCES decors(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE RESTRICT,
  PRIMARY KEY (decor_id, article_id)
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('prepa','shoot_studio','shoot_decor','depose')),
  start_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  end_at   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  lieu_id UUID NOT NULL REFERENCES lieux(id) ON DELETE RESTRICT,
  title TEXT,
  notes TEXT
);

CREATE TABLE session_prestataires (
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  prestataire_id UUID NOT NULL REFERENCES prestataires(id) ON DELETE RESTRICT,
  role_attribution TEXT NOT NULL,
  PRIMARY KEY (session_id, prestataire_id)
);

CREATE TABLE session_articles (
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE RESTRICT,
  PRIMARY KEY (session_id, article_id)
);

CREATE TABLE session_decors (
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  decor_id UUID NOT NULL REFERENCES decors(id) ON DELETE RESTRICT,
  PRIMARY KEY (session_id, decor_id)
);

CREATE TABLE validations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kind TEXT NOT NULL CHECK (kind IN ('article_studio_photo','decor_photo','decor_install','decor_uninstall')),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  target_article_id UUID REFERENCES articles(id) ON DELETE RESTRICT,
  target_decor_id   UUID REFERENCES decors(id)   ON DELETE RESTRICT,
  validated_by_prestataire_id UUID NOT NULL REFERENCES prestataires(id) ON DELETE RESTRICT,
  validated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
  CHECK (
    (kind = 'article_studio_photo' AND target_article_id IS NOT NULL AND target_decor_id IS NULL) OR
    (kind IN ('decor_photo','decor_install','decor_uninstall') AND target_decor_id IS NOT NULL AND target_article_id IS NULL)
  )
);

CREATE VIEW v_jours_travailles_prestataire AS
SELECT
  sp.prestataire_id,
  DATE(s.start_at) AS jour,
  COUNT(*) AS nb_sessions
FROM sessions s
JOIN session_prestataires sp ON sp.session_id = s.id
GROUP BY sp.prestataire_id, DATE(s.start_at);

CREATE VIEW v_articles_photographies AS
SELECT DISTINCT v.session_id, v.target_article_id AS article_id, v.validated_at::date AS jour
FROM validations v
WHERE v.kind = 'article_studio_photo';

CREATE VIEW v_decors_photographies AS
SELECT DISTINCT v.session_id, v.target_decor_id AS decor_id, v.validated_at::date AS jour
FROM validations v
WHERE v.kind = 'decor_photo';
