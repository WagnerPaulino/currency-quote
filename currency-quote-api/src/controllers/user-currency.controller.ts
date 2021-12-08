import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Currency, User
} from '../models';
import {UserRepository} from '../repositories';

export class UserCurrencyController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/currencies', {
    responses: {
      '200': {
        description: 'Array of User has many Currency through UserFavoriteCurrencies',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Currency)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Currency>,
  ): Promise<Currency[]> {
    return this.userRepository.currencies(id).find(filter);
  }

  @post('/users/{id}/currencies', {
    responses: {
      '200': {
        description: 'create a Currency model instance',
        content: {'application/json': {schema: getModelSchemaRef(Currency)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {
            title: 'NewCurrencyInUser',
            exclude: ['id'],
          }),
        },
      },
    }) currency: Omit<Currency, 'id'>,
  ): Promise<Currency> {
    return this.userRepository.currencies(id).create(currency);
  }

  @patch('/users/{id}/currencies', {
    responses: {
      '200': {
        description: 'User.Currency PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Currency, {partial: true}),
        },
      },
    })
    currency: Partial<Currency>,
    @param.query.object('where', getWhereSchemaFor(Currency)) where?: Where<Currency>,
  ): Promise<Count> {
    return this.userRepository.currencies(id).patch(currency, where);
  }

  @del('/users/{id}/currencies', {
    responses: {
      '200': {
        description: 'User.Currency DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Currency)) where?: Where<Currency>,
  ): Promise<Count> {
    return this.userRepository.currencies(id).delete(where);
  }
}
