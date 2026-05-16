export default (config: any) => {
  return {
    ...config,
    server: {
      ...config.server,
      allowedHosts: [
        ...(config.server?.allowedHosts ?? []),
        "cms.squadron.com.pl",
      ],
    },
  };
};