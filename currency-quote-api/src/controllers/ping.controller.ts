import {inject} from '@loopback/core';
import {
  get, Request, response,
  ResponseObject, RestBindings
} from '@loopback/rest';
import {CurrencyApi} from '../services';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {

  constructor(@inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.CurrencyApi') public currencyApiService: CurrencyApi) { }

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  async ping(): Promise<any> {
    return await this.currencyApiService.lastQuotation("USD-BRL");
  }
}
