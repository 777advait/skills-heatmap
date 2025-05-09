import ky, { HTTPError, type KyInstance } from "ky";

export class BaseService {
  protected readonly api: KyInstance;
  protected readonly serviceUrl: URL;

  constructor(baseUrl: string, subPath?: string) {
    this.serviceUrl = new URL(subPath ? `${baseUrl}/${subPath}` : baseUrl);
    this.api = ky.create({
      prefixUrl: this.serviceUrl,
      timeout: 10000,
      retry: {
        limit: 3,
        methods: ["GET", "POST"],
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
        
      },
    });
  }

  protected async makeRequest<ResponseShape>(
    endpoint: string,
    method: "GET" | "POST",
    body?: Record<string, any>,
    headers?: Headers,
  ): Promise<ResponseShape> {
    endpoint = endpoint.replace(/^\/+/, "");

    try {
      return await this.api<ResponseShape>(endpoint, {
        method,
        headers,
        ...(method === "POST" && body ? { json: body } : {}),
      }).json();
    } catch (err) {
      throw err instanceof HTTPError
        ? new Error(
            `[${this.serviceUrl.host}${this.serviceUrl.pathname}] Error making request: ${err.message}`,
          )
        : new Error(
            `[${this.serviceUrl.host}${this.serviceUrl.pathname}] Error making request: ${String(err)}`,
          );
    }
  }
}
