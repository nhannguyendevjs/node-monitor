import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';
import path from 'node:path';
import { RequestConfigs } from './app.config.mjs';
import { cacheControlNoStore } from './middleware/cache-control.mjs';
import { V1Router } from './routes/v1/v1.mjs';

// Bootstrap modules and services
import * as AppConfigModule from './app.config.mjs';
import * as LoggerService from './services/logger/logger.mjs';

await LoggerService.bootstrap();
await AppConfigModule.bootstrap();

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(multer().any());
app.use(express.json({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE }));
app.use(express.raw({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE }));
app.use(express.text({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE }));
app.use(express.urlencoded({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE, extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cacheControlNoStore);

app.use('/api/v1', V1Router);

app.use('/', (req, res) => {
  LoggerService.Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 404`);
  res.status(404).json({ message: 'Not found' });
});

// Use helmet middleware after api-docs route
// Issue: https://github.com/scottie1984/swagger-ui-express/issues/212
app.use(helmet());

export default app;
