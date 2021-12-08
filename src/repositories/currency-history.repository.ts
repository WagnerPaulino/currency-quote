import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CurrencyHistory, CurrencyHistoryRelations} from '../models';

export class CurrencyHistoryRepository extends DefaultCrudRepository<
  CurrencyHistory,
  typeof CurrencyHistory.prototype.code,
  CurrencyHistoryRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(CurrencyHistory, dataSource);
  }
}
