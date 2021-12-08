import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CurrencyHistory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  code: string;

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
    type: 'date',
  })
  create_date?: string;

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
