import { GlobalConfig } from './setting.model';

export default (): GlobalConfig => ({
  appName: 'pichanga',
  http: {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || '0.0.0.0',
  },
  db: {
    uri: process.env.DB_HOST,
    dbName: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  },
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID,
    groupId: process.env.KAFKA_GROUP_ID,
    brokers: process.env.KAFKA_BROKERS?.split(','),
  },
  unleash: {
    apiUrl: process.env.UNLEASH_API_URL,
    apiToken:
      process.env.UNLEASH_API_TOKEN ||
      'default:development.unleash-insecure-api-token',
  },
});
//'user:cc60edc63a0c450688a04b96a8577c9445b0b020bd7bb578b0368403',
