import dotenv from 'dotenv';
import { FiscalapiSettings } from 'fiscalapi/dist/types';
import path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


console.log('FISCALAPI_API_KEY', process.env.FISCALAPI_API_KEY);
console.log('FISCALAPI_TENANT', process.env.FISCALAPI_TENANT);
console.log('FISCALAPI_API_URL', process.env.FISCALAPI_API_URL);

interface Config {
  port: number;
  fiscalapiSettings: FiscalapiSettings;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  fiscalapiSettings: {
    apiKey: process.env.FISCALAPI_API_KEY || '',
    tenant: process.env.FISCALAPI_TENANT || '',
    apiUrl: process.env.FISCALAPI_API_URL || '',
  }
};

export default config;