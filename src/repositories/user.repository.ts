import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {User, UserRelations, Currency, UserFavoriteCurrencies} from '../models';
import {UserFavoriteCurrenciesRepository} from './user-favorite-currencies.repository';
import {CurrencyRepository} from './currency.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly currencies: HasManyThroughRepositoryFactory<Currency, typeof Currency.prototype.id,
          UserFavoriteCurrencies,
          typeof User.prototype.id
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UserFavoriteCurrenciesRepository') protected userFavoriteCurrenciesRepositoryGetter: Getter<UserFavoriteCurrenciesRepository>, @repository.getter('CurrencyRepository') protected currencyRepositoryGetter: Getter<CurrencyRepository>,
  ) {
    super(User, dataSource);
    this.currencies = this.createHasManyThroughRepositoryFactoryFor('currencies', currencyRepositoryGetter, userFavoriteCurrenciesRepositoryGetter,);
    this.registerInclusionResolver('currencies', this.currencies.inclusionResolver);
  }
}
