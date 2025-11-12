// server/src/index.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Routers
import prestataires from './routes/prestataires';
import lieux from './routes/lieux';
import articles from './routes/articles';
import decors from './routes/decors';
import sessions from './routes/sessions';
import validations from './routes/validations';
import history from './routes/history';

const app = express();
app.use(cors());
app.use(express.json());

// Swagger (doc OpenAPI)
const openapiDoc = YAML.load('./openapi.yaml'); // le fichier à la racine de `server/`
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDoc));

// Monte les routes
app.use('/prestataires', prestataires);
app.use('/lieux', lieux);
app.use('/articles', articles);
app.use('/decors', decors);
app.use('/sessions', sessions);
app.use('/validations', validations);
app.use('/history', history);

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`✅ API sur http://localhost:${port}  (docs: /docs)`));
