import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {CurrencyHistory} from '../models';

const config: ModelCrudRestApiConfig = {
  model: CurrencyHistory,
  pattern: 'CrudRest',
  dataSource: 'mongodb',
  basePath: '/currency-histories',
};
module.exports = config;
