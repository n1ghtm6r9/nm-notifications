declare module '@nmxjs/config' {
  interface IConfig {
    notification?: {
      telegrams?: Array<{
        token: string;
        chatId: number;
      }>;
    };
  }
  const configKey: string;
}
