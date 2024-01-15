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
});
//'user:cc60edc63a0c450688a04b96a8577c9445b0b020bd7bb578b0368403',
