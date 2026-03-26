declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      REFRESH_TOKEN_SECRET: string;
      ACCESS_TOKEN_SECRET: string;
      // DATABASE_URL: string;
      DBuser: string;
      DBpassword: string;
      DBhost: string;
      DBport: number;
      DBname: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
export {};
