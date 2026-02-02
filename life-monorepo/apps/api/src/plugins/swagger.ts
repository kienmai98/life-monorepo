import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

/**
 * OpenAPI/Swagger plugin configuration
 */
export default fp(async function swaggerPlugin(fastify: FastifyInstance): Promise<void> {
  // Swagger documentation
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Life API',
        description: 'API for Life application - Personal finance and life management',
        version: '1.0.0',
        contact: {
          name: 'API Support',
          email: 'support@example.com',
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT',
        },
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Development server',
        },
        {
          url: 'https://api.example.com',
          description: 'Production server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'JWT token obtained from login/register endpoints',
          },
        },
        schemas: {
          Error: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: false },
              error: {
                type: 'object',
                properties: {
                  code: { type: 'string', example: 'VALIDATION_ERROR' },
                  message: { type: 'string', example: 'Validation failed' },
                  details: { type: 'object' },
                },
              },
            },
          },
          User: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              email: { type: 'string', format: 'email' },
              displayName: { type: 'string', nullable: true },
              photoURL: { type: 'string', format: 'uri', nullable: true },
              role: { type: 'string', enum: ['user', 'admin'] },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
          Transaction: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              userId: { type: 'string', format: 'uuid' },
              amount: { type: 'number', minimum: 0 },
              category: { type: 'string' },
              description: { type: 'string' },
              type: { type: 'string', enum: ['income', 'expense'] },
              date: { type: 'string', format: 'date-time' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time', nullable: true },
            },
          },
          PaginationMeta: {
            type: 'object',
            properties: {
              page: { type: 'integer', minimum: 1 },
              pageSize: { type: 'integer', minimum: 1 },
              total: { type: 'integer', minimum: 0 },
              hasMore: { type: 'boolean' },
            },
          },
        },
      },
      tags: [
        { name: 'Auth', description: 'Authentication endpoints' },
        { name: 'Transactions', description: 'Transaction management' },
        { name: 'Health', description: 'Health check endpoints' },
      ],
    },
  });

  // Swagger UI
  await fastify.register(swaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
      persistAuthorization: true,
    },
    staticCSP: true,
  });
});
