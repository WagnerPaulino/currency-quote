import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {UserFavoriteCurrencies} from '../models';

const config: ModelCrudRestApiConfig = {
  model: UserFavoriteCurrencies,
  pattern: 'CrudRest',
  dataSource: 'postgres',
  basePath: '/user-favorite-currencies',
};
module.exports = config;
