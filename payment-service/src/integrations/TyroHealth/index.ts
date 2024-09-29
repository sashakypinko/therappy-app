import * as process from "process";

import { EAuthType } from "enums";
import { HttpService } from "utils";
import { TyroAPI, TyroTokenPayload } from "../../constants";

interface IGenerateTokenResponse {
  token: string
}

export class TyroHealth {
  http = new HttpService(`${process.env.TYRO_BASE_URL}/${TyroAPI.V3}`);

  async generateAuthToken() {
    return this.http.post<IGenerateTokenResponse>(TyroAPI.AUTH_TOKEN, TyroTokenPayload, {
      type: EAuthType.BEARER,
      token: process.env.TYRO_API_KEY
    });
  }
}
