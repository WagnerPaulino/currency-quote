import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CurrencyHistory,
  CurrencyHistoricFields,
} from '../models';
import {CurrencyHistoryRepository} from '../repositories';

export class CurrencyHistoryCurrencyHistoricFieldsController {
  constructor(
    @repository(CurrencyHistoryRepository) protected currencyHistoryRepository: CurrencyHistoryRepository,
  ) { }

  @get('/currency-histories/{id}/currency-historic-fields', {
    responses: {
      '200': {
        description: 'Array of CurrencyHistory has many CurrencyHistoricFields',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CurrencyHistoricFields)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CurrencyHistoricFields>,
  ): Promise<CurrencyHistoricFields[]> {
    return this.currencyHistoryRepository.history(id).find(filter);
  }

  @post('/currency-histories/{id}/currency-historic-fields', {
    responses: {
      '200': {
        description: 'CurrencyHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(CurrencyHistoricFields)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CurrencyHistory.prototype.code,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CurrencyHistoricFields, {
            title: 'NewCurrencyHistoricFieldsInCurrencyHistory',
            exclude: ['code'],
            optional: ['currencyHistoryId']
          }),
        },
      },
    }) currencyHistoricFields: Omit<CurrencyHistoricFields, 'code'>,
  ): Promise<CurrencyHistoricFields> {
    return this.currencyHistoryRepository.history(id).create(currencyHistoricFields);
  }

  @patch('/currency-histories/{id}/currency-historic-fields', {
    responses: {
      '200': {
        description: 'CurrencyHistory.CurrencyHistoricFields PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CurrencyHistoricFields, {partial: true}),
        },
      },
    })
    currencyHistoricFields: Partial<CurrencyHistoricFields>,
    @param.query.object('where', getWhereSchemaFor(CurrencyHistoricFields)) where?: Where<CurrencyHistoricFields>,
  ): Promise<Count> {
    return this.currencyHistoryRepository.history(id).patch(currencyHistoricFields, where);
  }

  @del('/currency-histories/{id}/currency-historic-fields', {
    responses: {
      '200': {
        description: 'CurrencyHistory.CurrencyHistoricFields DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CurrencyHistoricFields)) where?: Where<CurrencyHistoricFields>,
  ): Promise<Count> {
    return this.currencyHistoryRepository.history(id).delete(where);
  }
}
