import type { ListenOptions } from "net";
import { createApp, prepareApp } from "./app";
import { log } from "./vite";

const app = createApp();

type ListenOptionsWithReusePort = ListenOptions & { reusePort?: boolean };

(async () => {
  const server = await prepareApp(app);

  const port = Number(process.env.PORT) || 5000;
  const host = process.env.HOST || "0.0.0.0";
  const reusePortEnabled = process.env.REUSE_PORT_ENABLED === "true";

  const baseListenOptions: ListenOptionsWithReusePort = {
    port,
    host,
  };

  const listenOptions: ListenOptionsWithReusePort = reusePortEnabled
    ? { ...baseListenOptions, reusePort: true }
    : baseListenOptions;

  async function startServer(options: ListenOptionsWithReusePort) {
    await new Promise<void>((resolve, reject) => {
      const onError = (err: NodeJS.ErrnoException) => {
        server.off("listening", onListening);
        reject(err);
      };

      const onListening = () => {
        server.off("error", onError);
        resolve();
      };

      server.once("error", onError);
      server.once("listening", onListening);
      server.listen(options);
    });
  }

  const allowFallback =
    app.get("env") === "development" &&
    process.env.ALLOW_LOCAL_PORT_FALLBACK !== "false";
  const fallbackPort = Number(process.env.DEV_FALLBACK_PORT) || 5050;

  try {
    await startServer(listenOptions);
    log(`serving on http://${host}:${listenOptions.port}`);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (
      err.code === "EADDRINUSE" &&
      allowFallback &&
      fallbackPort !== port
    ) {
      log(
        `port ${port} is already in use locally, retrying on ${fallbackPort}`,
      );
      const fallbackOptions: ListenOptionsWithReusePort = reusePortEnabled
        ? { ...baseListenOptions, port: fallbackPort, reusePort: true }
        : { ...baseListenOptions, port: fallbackPort };
      await startServer(fallbackOptions);
      log(`serving on http://${host}:${fallbackOptions.port}`);
    } else {
      throw error;
    }
  }
})();
