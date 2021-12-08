import {Entity, hasMany, model, property} from '@loopback/repository';
import {CurrencyHistoricFields} from './currency-historic-fields.model';

@model({
  settings: {},
})
export class CurrencyHistory extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  code: string;

  @hasMany(() => CurrencyHistoricFields)
  history: CurrencyHistoricFields[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CurrencyHistory>) {
    super(data);
  }
}

export interface CurrencyHistoryRelations {
  // describe navigational properties here
}

export type CurrencyHistoryWithRelations = CurrencyHistory & CurrencyHistoryRelations;
