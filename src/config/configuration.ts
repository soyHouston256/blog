import { GlobalConfig } from './setting.model';

export default (): GlobalConfig => ({
  appName: 'pichanga',
  http: {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || '0.0.0.0',
  },
  db: {
    uri: process.env.DB_HOST || 'mongodb://localhost:27017',
    dbName: process.env.DB_DATABASE || 'pichanga',
    user: process.env.DB_USERNAME || 'superAdmin',
    pass: process.env.DB_PASSWORD || 'password1',
  },
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID || 'transaction',
    groupId: process.env.KAFKA_GROUP_ID || 'transaction-consumer',
    brokers: process.env.KAFKA_BROKERS?.split(','),
  },
  unleash: {
    apiUrl: process.env.UNLEASH_API_URL || 'http://localhost:4242/api/',
    apiToken:
      process.env.UNLEASH_API_TOKEN ||
      'default:development.unleash-insecure-api-token',
  },
});
//'user:cc60edc63a0c450688a04b96a8577c9445b0b020bd7bb578b0368403',
