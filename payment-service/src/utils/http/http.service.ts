import { EAuthType } from "enums";
import { IMap } from "interfaces";
import { HttpServiceErrors } from "../../constants";

interface IAuth {
  type: EAuthType
  token?: string
  appKey?: string
  apiSecret?: string
}

interface IOptions {
  params?: IMap<any>
}

export class HttpService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async post<T>(endpoint: string, body: IMap<any>, auth?: IAuth): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const isBasic = auth && auth.type === EAuthType.BASIC;
    const isBearer = auth && auth.type === EAuthType.BEARER;

    if (isBearer) {
      if (!auth.token)
        throw new Error(HttpServiceErrors.MISSING_TOKEN);

      headers["Authorization"] = `Bearer ${auth.token}`;
    }

    if (isBasic) {
      if (!auth.apiSecret || !auth.appKey)
        throw new Error(HttpServiceErrors.MISSING_BASIC_PARAMS);

      const authorization = btoa(`${auth.appKey}:${auth.apiSecret}`);

      headers["Authorization"] = `Basic ${authorization}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(`HttpService Error: ${response.status}`);

    return response.json();
  }

  async get(endpoint: string, options?: IOptions): Promise<any> {
    let url = `${this.baseUrl}${endpoint}`;

    if (options && options.params) {
      const queryParams = new URLSearchParams(options.params);

      url += `?${queryParams.toString()}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HttpService Error: ${response.status}`);
    }

    return response.json();
  }
}
