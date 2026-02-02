import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

/**
 * Rate limiting configuration
 */
interface RateLimitConfig {
  max: number;
  timeWindow: string;
  keyGenerator?: (request: { ip: string; user?: { id: string } }) => string;
}

/**
 * Default rate limit configurations by route type
 */
const rateLimitConfigs: Record<string, RateLimitConfig> = {
  // Strict limits for authentication routes
  auth: {
    max: 5,
    timeWindow: '15 minutes',
    keyGenerator: (req) => `auth:${req.ip}`,
  },
  // General API limits
  default: {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.user?.id ?? `ip:${req.ip}`,
  },
  // Strict limits for sensitive operations
  sensitive: {
    max: 10,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.user?.id ?? `ip:${req.ip}`,
  },
};

/**
 * Simple in-memory rate limiter (for development)
 * In production, use Redis or a proper rate limiting service
 */
class RateLimiter {
  private requests = new Map<string, { count: number; resetTime: number }>();

  isAllowed(key: string, max: number, timeWindowMs: number): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const record = this.requests.get(key);

    if (!record || now > record.resetTime) {
      this.requests.set(key, { count: 1, resetTime: now + timeWindowMs });
      return { allowed: true, remaining: max - 1, resetTime: now + timeWindowMs };
    }

    if (record.count >= max) {
      return { allowed: false, remaining: 0, resetTime: record.resetTime };
    }

    record.count++;
    return { allowed: true, remaining: max - record.count, resetTime: record.resetTime };
  }

  parseTimeWindow(timeWindow: string): number {
    const match = timeWindow.match(/(\d+)\s*(minute|minutes|hour|hours|second|seconds)/);
    if (!match) return 60000; // Default 1 minute
    
    const value = parseInt(match[1], 10);
    const unit = match[2];
    
    const multipliers: Record<string, number> = {
      second: 1000,
      seconds: 1000,
      minute: 60000,
      minutes: 60000,
      hour: 3600000,
      hours: 3600000,
    };
    
    return value * (multipliers[unit] ?? 60000);
  }
}

const limiter = new RateLimiter();

/**
 * Rate limiting plugin
 * 
 * Provides rate limiting for API routes
 */
export default fp(async function rateLimitPlugin(fastify: FastifyInstance): Promise<void> {
  fastify.decorate('rateLimit', {
    async check(request: { ip: string; user?: { id: string } }, type: keyof typeof rateLimitConfigs = 'default') {
      const config = rateLimitConfigs[type];
      const key = config.keyGenerator?.(request) ?? `ip:${request.ip}`;
      const timeWindowMs = limiter.parseTimeWindow(config.timeWindow);
      
      const result = limiter.isAllowed(key, config.max, timeWindowMs);
      
      if (!result.allowed) {
        const error = new Error('Rate limit exceeded');
        (error as Error & { code: string }).code = 'FST_ERR_RATE_LIMIT';
        throw error;
      }
      
      return result;
    },
  });
});

declare module 'fastify' {
  interface FastifyInstance {
    rateLimit: {
      check: (request: { ip: string; user?: { id: string } }, type?: keyof typeof rateLimitConfigs) => Promise<{
        allowed: boolean;
        remaining: number;
        resetTime: number;
      }>;
    };
  }
}
