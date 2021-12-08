import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CurrencyHistoricFields, CurrencyHistoricFieldsRelations} from '../models';

export class CurrencyHistoricFieldsRepository extends DefaultCrudRepository<
  CurrencyHistoricFields,
  typeof CurrencyHistoricFields.prototype.code,
  CurrencyHistoricFieldsRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CurrencyHistoricFields, dataSource);
  }
}
