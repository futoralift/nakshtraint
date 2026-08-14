import "./lib/error-capture";

// Ensure createMiddleware is defined globally if Nitro SSR bundle tree-shaking omits it
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (typeof (globalThis as any).createMiddleware !== "function") {
  const createMiddlewareImpl = (options: unknown, __opts: unknown) => {
    const resolvedOptions = { type: "request", ...((__opts as object) || (options as object)) };
    const setValidator = (validator: unknown) =>
      createMiddlewareImpl(
        {},
        Object.assign(resolvedOptions, { validator, inputValidator: validator }),
      );
    return {
      options: resolvedOptions,
      middleware: (m: unknown) =>
        createMiddlewareImpl({}, Object.assign(resolvedOptions, { middleware: m })),
      validator: setValidator,
      inputValidator: setValidator,
      client: (c: unknown) =>
        createMiddlewareImpl({}, Object.assign(resolvedOptions, { client: c })),
      server: (s: unknown) =>
        createMiddlewareImpl({}, Object.assign(resolvedOptions, { server: s })),
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).createMiddleware = createMiddlewareImpl;
}

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
