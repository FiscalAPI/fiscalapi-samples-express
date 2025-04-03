// services/fiscalapi.service.ts
import { FiscalapiClient } from 'fiscalapi' 
import config from '../config/config';

export const createFiscalApiClient = () => {    
    return FiscalapiClient.create({
        apiUrl: config.fiscalapiSettings.apiUrl,
        apiKey: config.fiscalapiSettings.apiKey,
        tenant: config.fiscalapiSettings.tenant
    });
};