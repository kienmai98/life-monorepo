import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import swaggerPlugin from './plugins/swagger.js';
import authPlugin from './plugins/auth.js';
import errorHandlerPlugin from './plugins/error-handler.js';
import rateLimitPlugin from './plugins/rate-limit.js';
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transactions.routes.js';

// Load environment variables
dotenv.config();

/**
 * Validate required environment variables
 */
function validateEnv(): void {
  const required = ['JWT_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_KEY'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.warn(
      `Missing environment variables: ${missing.join(', ')}. Using defaults for development.`
    );
  }
}

/**
 * Build and configure Fastify application
 */
export async function buildApp(): Promise<FastifyInstance> {
  // Validate environment
  validateEnv();

  // Create Fastify instance
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
    },
    genReqId: () => crypto.randomUUID(),
    disableRequestLogging: process.env.NODE_ENV === 'test',
  });

  // Register plugins
  await app.register(cors, {
    origin: (origin, cb) => {
      const allowedOrigins = process.env.CORS_ORIGIN?.split(',') ?? [
        'http://localhost:3000',
        'http://localhost:5173',
      ];
      
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) {
        cb(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        cb(null, true);
        return;
      }

      // In development, allow all origins
      if (process.env.NODE_ENV === 'development') {
        cb(null, true);
        return;
      }

      cb(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Register JWT
  await app.register(jwt, {
    secret: process.env.JWT_SECRET ?? 'development-secret-key',
    sign: {
      expiresIn: '7d',
    },
  });

  // Register Swagger/OpenAPI
  await app.register(swaggerPlugin);

  // Register custom plugins
  await app.register(rateLimitPlugin);
  await app.register(authPlugin);
  await app.register(errorHandlerPlugin);

  // Health check endpoint
  app.get('/health', {
    schema: {
      tags: ['Health'],
      description: 'Health check endpoint',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' },
            timestamp: { type: 'string', format: 'date-time' },
            version: { type: 'string' },
          },
        },
      },
    },
  }, async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? '1.0.0',
  }));

  // Register routes
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(transactionRoutes, { prefix: '/api/transactions' });

  return app;
}

/**
 * Start the server
 */
async function start(): Promise<void> {
  try {
    const app = await buildApp();
    const port = parseInt(process.env.PORT ?? '3001', 10);

    await app.listen({
      port,
      host: '0.0.0.0',
    });

    app.log.info(`Server listening on port ${port}`);
    app.log.info(`API Documentation: http://localhost:${port}/documentation`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Start server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  start();
}

export default buildApp;
