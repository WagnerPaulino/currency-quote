import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CurrencyHistoricFields, CurrencyHistory, CurrencyHistoryRelations} from '../models';
import {CurrencyHistoricFieldsRepository} from './currency-historic-fields.repository';

export class CurrencyHistoryRepository extends DefaultCrudRepository<
  CurrencyHistory,
  typeof CurrencyHistory.prototype.code,
  CurrencyHistoryRelations
> {

  public readonly history: HasManyRepositoryFactory<CurrencyHistoricFields, typeof CurrencyHistory.prototype.code>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CurrencyHistoricFieldsRepository') protected currencyHistoricFieldsRepositoryGetter: Getter<CurrencyHistoricFieldsRepository>,
  ) {
    super(CurrencyHistory, dataSource);
    this.history = this.createHasManyRepositoryFactoryFor('history', currencyHistoricFieldsRepositoryGetter,);
    this.registerInclusionResolver('history', this.history.inclusionResolver);
  }
}
