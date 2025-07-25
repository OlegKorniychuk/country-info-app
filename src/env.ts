import z from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  DATENAGER_URL: z.string(),
  COUNTRIESNOW_URL: z.string()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log('Invalid environment file');
  console.error(parsedEnv.error);
  process.exit(1);
}

export const env = parsedEnv.data;
