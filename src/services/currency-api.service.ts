import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {CurrenciesApiDataSource} from '../datasources';
import {CurrencyHistoricFields} from '../models';

export interface CurrencyApi {

  lastQuotation(currencies: string): Promise<Map<string, CurrencyHistoricFields>>
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
}

export class CurrencyApiProvider implements Provider<CurrencyApi> {
  constructor(
    // CurrenciesApi must match the name property in the datasource json file
    @inject('datasources.CurrenciesApi')
    protected dataSource: CurrenciesApiDataSource = new CurrenciesApiDataSource(),
  ) { }

  value(): Promise<CurrencyApi> {
    return getService(this.dataSource);
  }
}
