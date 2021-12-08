import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {UserFavoriteCurrencies, UserFavoriteCurrenciesRelations} from '../models';

export class UserFavoriteCurrenciesRepository extends DefaultCrudRepository<
  UserFavoriteCurrencies,
  typeof UserFavoriteCurrencies.prototype.id,
  UserFavoriteCurrenciesRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(UserFavoriteCurrencies, dataSource);
  }
}
