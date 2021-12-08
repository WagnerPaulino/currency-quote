import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class UserFavoriteCurrencies extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  userId?: number;

  @property({
    type: 'number',
  })
  currencyId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserFavoriteCurrencies>) {
    super(data);
  }
}

export interface UserFavoriteCurrenciesRelations {
  // describe navigational properties here
}

export type UserFavoriteCurrenciesWithRelations = UserFavoriteCurrencies & UserFavoriteCurrenciesRelations;
