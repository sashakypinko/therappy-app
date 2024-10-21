interface Window {
  MedipassTransactionSDK: {
    setConfig: (config: {
      env: string;
      apiKey: string;
      appId: string;
      appVersion: string;
    }) => void;
    renderCreateTransaction: (
      options: Record<string, unknown>,
      callbacks: {
        onSuccess: (data: any) => void;
        onError: (data: any) => void;
        onCancel: () => void;
      }
    ) => void;
  };
}
