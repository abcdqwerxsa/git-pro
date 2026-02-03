import { serveLandingPage } from "./landing.ts";

const GITHUB_HOSTS: Record<string, string> = {
  "": "github.com",
  "raw": "raw.githubusercontent.com",
  "gist": "gist.github.com",
  "api": "api.github.com",
  "codeload": "codeload.github.com",
  "releases": "github.com",
  "objects": "objects.githubusercontent.com",
  "avatars": "avatars.githubusercontent.com",
};

const HOP_BY_HOP_HEADERS = [
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "86400",
};

function buildTargetUrl(pathname: string, search: string): string | null {
  const path = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  if (!path) return null;
  
  const segments = path.split("/");
  const firstSegment = segments[0].toLowerCase();
  
  let targetHost: string;
  let targetPath: string;
  
  if (firstSegment in GITHUB_HOSTS && firstSegment !== "") {
    targetHost = GITHUB_HOSTS[firstSegment];
    targetPath = segments.slice(1).join("/");
  } else {
    targetHost = GITHUB_HOSTS[""];
    targetPath = path;
  }
  
  if (!targetPath) return null;
  
  return `https://${targetHost}/${targetPath}${search}`;
}

async function proxyToGitHub(
  request: Request,
  targetUrl: string
): Promise<Response> {
  const headers = new Headers();
  
  for (const [key, value] of request.headers.entries()) {
    const lowerKey = key.toLowerCase();
    if (!HOP_BY_HOP_HEADERS.includes(lowerKey) && lowerKey !== "host") {
      headers.set(key, value);
    }
  }
  
  headers.set("Host", new URL(targetUrl).host);
  headers.set("User-Agent", request.headers.get("User-Agent") || "GitPro/1.0");
  headers.delete("Referer");
  
  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.method !== "GET" && request.method !== "HEAD" 
        ? request.body 
        : undefined,
      redirect: "manual",
    });
    
    const responseHeaders = new Headers();
    
    for (const [key, value] of response.headers.entries()) {
      const lowerKey = key.toLowerCase();
      if (!HOP_BY_HOP_HEADERS.includes(lowerKey)) {
        responseHeaders.set(key, value);
      }
    }
    
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      responseHeaders.set(key, value);
    }
    
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (location) {
        const rewrittenLocation = rewriteLocation(location);
        responseHeaders.set("Location", rewrittenLocation);
      }
    }
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch from GitHub", details: String(error) }),
      {
        status: 502,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      }
    );
  }
}

function rewriteLocation(location: string): string {
  try {
    const url = new URL(location);
    const host = url.host;
    
    const hostToPrefix: Record<string, string> = {
      "github.com": "",
      "raw.githubusercontent.com": "/raw",
      "api.github.com": "/api",
      "gist.github.com": "/gist",
      "codeload.github.com": "/codeload",
      "objects.githubusercontent.com": "/objects",
      "avatars.githubusercontent.com": "/avatars",
    };
    
    if (host in hostToPrefix) {
      const prefix = hostToPrefix[host];
      return `${prefix}${url.pathname}${url.search}`;
    }
    
    return location;
  } catch {
    return location;
  }
}

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  
  if (pathname === "/" || pathname === "") {
    return serveLandingPage();
  }
  
  if (pathname === "/favicon.ico") {
    return new Response(null, { status: 204 });
  }
  
  if (pathname === "/health") {
    return new Response(JSON.stringify({ status: "ok", service: "gitpro" }), {
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }
  
  const targetUrl = buildTargetUrl(pathname, url.search);
  
  if (!targetUrl) {
    return new Response(
      JSON.stringify({ error: "Invalid path. Use format: /user/repo or /raw/user/repo/file" }),
      { status: 400, headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
    );
  }
  
  return proxyToGitHub(request, targetUrl);
}

Deno.serve(handler);
