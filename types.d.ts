declare module '@nmxjs/config' {
  interface IConfig {
    notification?: {
      telegrams?: Array<{
        token: string;
        chatIds: string[];
      }>;
    };
  }
  const configKey: string;
}
