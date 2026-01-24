import { z } from 'zod';
import { insertUserSchema, insertMachinerySchema, insertManpowerSchema, users, machinery, manpower } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    register: {
      method: 'POST' as const,
      path: '/api/register',
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/login',
      input: z.object({ username: z.string(), password: z.string() }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.object({ message: z.string() }),
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout',
      responses: {
        200: z.void(),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.void(),
      },
    },
  },
  machinery: {
    list: {
      method: 'GET' as const,
      path: '/api/machinery',
      responses: {
        200: z.array(z.custom<typeof machinery.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/machinery/:id',
      responses: {
        200: z.custom<typeof machinery.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  manpower: {
    list: {
      method: 'GET' as const,
      path: '/api/manpower',
      responses: {
        200: z.array(z.custom<typeof manpower.$inferSelect>()),
      },
    },
  },
  weather: {
    get: {
      method: 'GET' as const,
      path: '/api/weather',
      input: z.object({ location: z.string() }).optional(),
      responses: {
        200: z.object({
          location: z.string(),
          temp: z.number(),
          condition: z.string(),
          humidity: z.number(),
          windSpeed: z.number(),
          forecast: z.array(z.object({ day: z.string(), temp: z.number(), condition: z.string() })),
          advisory: z.string(),
        }),
      },
    },
  },
  prediction: {
    predict: {
      method: 'POST' as const,
      path: '/api/predict-yield',
      input: z.object({ crop: z.string(), area: z.number(), location: z.string() }),
      responses: {
        200: z.object({ predictedYield: z.string(), confidence: z.number() }),
      },
    },
  },
  prices: {
    list: {
      method: 'GET' as const,
      path: '/api/market-prices',
      responses: {
        200: z.array(z.object({
          crop: z.string(),
          price: z.number(), // INR per Quintal
          market: z.string(),
          trend: z.enum(['up', 'down', 'stable']),
        })),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
