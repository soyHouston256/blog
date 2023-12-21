export interface GlobalConfig {
  appName: string;
  http: httpConfig;
  db: mongodbConfig;
  kafka: kafkaConfig;
  unleash: UnleashParams;
}
export interface httpConfig {
  port: number;
  host: string;
}

export interface mongodbConfig {
  uri: string;
  dbName: string;
  user: string;
  pass: string;
}
export interface kafkaConfig {
  clientId: string;
  groupId: string;
  brokers: string[];
}

export interface UnleashParams {
  apiUrl: string;
  apiToken: string;
}
