import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Currency} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Currency,
  pattern: 'CrudRest',
  dataSource: 'postgres',
  basePath: '/currencies',
};
module.exports = config;
