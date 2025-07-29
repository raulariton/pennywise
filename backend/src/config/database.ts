import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dotenv from 'dotenv';

dotenv.config();

// ensure env variables are defined
if (!process.env.DATABASE_URL || !process.env.DATABASE_PASSWORD) {
  throw new Error(
    'DATABASE_URL and DATABASE_PASSWORD must be defined in the environment variables',
  );
}

// our supabase password contains special characters,
//  so it must be URL encoded to be processed correctly
const completeDatabaseURL = process.env.DATABASE_URL.replace(
  '[PASSWORD]',
  encodeURIComponent(process.env.DATABASE_PASSWORD),
);

const config: PostgresConnectionOptions = {
  type: 'postgres',
  url: completeDatabaseURL,
  synchronize: false, // TODO: use migrations from now on for any modifications
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
};

const dataSource = new DataSource(config);

export default dataSource;
