import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class CurrencyHistoricFields extends Entity {

  @property({
    type: 'string',
    id: true
  })
  id?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  codein?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  high?: string;

  @property({
    type: 'string',
  })
  low?: string;

  @property({
    type: 'string',
  })
  varBid?: string;

  @property({
    type: 'string',
  })
  pctChange?: string;

  @property({
    type: 'string',
  })
  bid?: string;

  @property({
    type: 'string',
  })
  ask?: string;

  @property({
    type: 'string',
  })
  timestamp?: string;

  @property({
    type: 'string',
  })
  create_date?: string;

  @property({
    type: 'string',
    hidden: true
  })
  currencyHistoryId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CurrencyHistoricFields>) {
    super(data);
  }
}

export interface CurrencyHistoricFieldsRelations {
  // describe navigational properties here
}

export type CurrencyHistoricFieldsWithRelations = CurrencyHistoricFields & CurrencyHistoricFieldsRelations;
