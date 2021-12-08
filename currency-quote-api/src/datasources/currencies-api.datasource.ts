import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const baseUrl = 'https://economia.awesomeapi.com.br/json'

const config = {
  name: 'CurrenciesApi',
  connector: 'rest',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      contentType: 'application/json',
    },
  },
  operations: [
    {
      functions: {
        lastQuotation: ["currencies"]
      },
      template: {
        method: "GET",
        url: `${baseUrl}/last/{currencies:string}`
      }
    }
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CurrenciesApiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'CurrenciesApi';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.CurrenciesApi', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
