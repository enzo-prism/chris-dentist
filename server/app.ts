import express, { type Express, type Request, type Response, type NextFunction } from "express";
import compression from "compression";
import path from "path";
import { type Server } from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { getLegacyRedirectPath } from "@shared/redirects";

const CANONICAL_HOST = "www.chriswongdds.com";
const CANONICAL_BASE = `https://${CANONICAL_HOST}`;

export function configureBaseApp(app: Express) {
  app.set("trust proxy", true);

  app.use((req: Request, res: Response, next: NextFunction) => {
    const hostHeader = req.get("host") ?? "";
    const hostname = hostHeader.split(":")[0];
    const isProdDomain =
      hostname === "chriswongdds.com" || hostname === CANONICAL_HOST;

    if (!isProdDomain) {
      return next();
    }

    const legacyTarget = getLegacyRedirectPath(req.path);
    const targetPath = legacyTarget ?? req.path;

    const forwardedProto = req.headers["x-forwarded-proto"];
    const proto =
      typeof forwardedProto === "string"
        ? forwardedProto.split(",")[0].trim()
        : req.protocol;
    const needsHttps = proto !== "https";
    const needsWww = hostname !== CANONICAL_HOST;

    if (legacyTarget || needsHttps || needsWww) {
      const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
      const [pathWithoutHash, hash] = targetPath.split("#");
      const location = hash
        ? `${CANONICAL_BASE}${pathWithoutHash}${query}#${hash}`
        : `${CANONICAL_BASE}${targetPath}${query}`;
      return res.redirect(301, location);
    }

    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(compression());

  const publicPath = path.resolve(process.cwd(), "public");
  app.use(
    express.static(publicPath, {
      maxAge: "1y",
      immutable: true,
      setHeaders(res, filePath) {
        if (
          filePath.endsWith(`${path.sep}robots.txt`) ||
          filePath.endsWith(`${path.sep}llms.txt`)
        ) {
          res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, max-age=0",
          );
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        }
      },
    }),
  );

  app.use((req, res, next) => {
    const start = Date.now();
    const requestPath = req.path;

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (requestPath.startsWith("/api")) {
        let logLine = `${req.method} ${requestPath} ${res.statusCode} in ${duration}ms`;

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        log(logLine);
      }
    });

    next();
  });
}

export function createApp() {
  const app = express();
  configureBaseApp(app);
  return app;
}

export async function prepareApp(
  app: Express,
  options: { serverForVite?: Server } = {},
): Promise<Server> {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(err);
    res.status(status).json({ message });
  });

  if (app.get("env") === "development") {
    await setupVite(app, options.serverForVite ?? server);
  } else {
    serveStatic(app);
  }

  return server;
}
