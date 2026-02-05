import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

const app = Fastify({
  logger: true,
});

// Register plugins
void app.register(cors, {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
});

void app.register(jwt, {
  secret: process.env.JWT_SECRET || 'default-secret-for-development',
});

// Health check endpoint
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Start server
const start = async (): Promise<void> => {
  try {
    const port = Number.parseInt(process.env.PORT || '3001', 10);
    const host = process.env.HOST || '0.0.0.0';
    await app.listen({ port, host });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

void start();
