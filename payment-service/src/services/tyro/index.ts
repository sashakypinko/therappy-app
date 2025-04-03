import * as process from "process";
import { HttpService } from "services";
import { Injectable, Inject } from "@nestjs/common";

import { TyroAPI, TyroTokenPayload } from "./constants";
import {IGenerateTokenResponse, ITransactionsResponse} from './interfaces';

@Injectable()
export class TyroService {
  constructor(
    @Inject("TyroHttpService")
    private readonly httpService: HttpService,
  ) {}

  async generateAuthToken(): Promise<IGenerateTokenResponse> {
    const query = `${TyroAPI.V3}${TyroAPI.AUTH_TOKEN}`;

    const response = await this.httpService.post<IGenerateTokenResponse>(query, TyroTokenPayload, {
      headers: {
        "x-appid": process.env.TYRO_APP_ID,
        "authorization": `Bearer ${process.env.TYRO_API_KEY}`
      }
    });

    return response.data;
  }

  async getExternalId(transactionId: string): Promise<string | null> {
    const query = `${TyroAPI.V3}/businesses/${process.env.TYRO_APP_BUSINESS_ID}/transactions?page=1&limit=10&transactionTypes=invoice&searchText=${transactionId}`;

    const response = await this.httpService.get<ITransactionsResponse>(query, {
      headers: {
        "x-appid": process.env.TYRO_APP_ID,
        "authorization": `Bearer ${process.env.TYRO_API_KEY}`
      }
    });
    
    if (!response.data.items || !response.data.items.length) {
      return null;
    }

    return response.data.items[0]._id;
  }
}
