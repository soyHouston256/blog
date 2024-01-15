export interface GlobalConfig {
  appName: string;
  http: httpConfig;
  db: mongodbConfig;
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
