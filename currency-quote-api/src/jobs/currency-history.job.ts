import { inject } from '@loopback/context';
import { CronJob, cronJob } from '@loopback/cron';
import { repository } from '@loopback/repository';
import { INITIAL_DATA } from '../initialData';
import { CurrencyHistoricFields, CurrencyHistory } from '../models';
import { CurrencyHistoryRepository } from '../repositories';
import { CurrencyApi } from '../services';

@cronJob()
export class CurrencyHistoryJob extends CronJob {
  constructor(
    @inject('services.CurrencyApi') public currencyApiService: CurrencyApi,
    @repository(CurrencyHistoryRepository) protected currencyHistoryRepository: CurrencyHistoryRepository
  ) {
    super({
      name: 'CurrencyHistoryJob',
      onTick: async () => {
        const currencyMapResponse = await currencyApiService.lastQuotation(this.getCurrenciesString());
        for (const [code, currency] of Object.entries(currencyMapResponse)) {
          const exist = await currencyHistoryRepository.exists(code);
          if (!exist) {
            await currencyHistoryRepository.create(new CurrencyHistory({ code }))
          }
          const currentHistory = await currencyHistoryRepository.history(code).find(
            {
              where: {
                and: [
                  { ask: currency.ask },
                  { high: currency.high },
                  { low: currency.low },
                  { low: currency.low },
                  { create_date: currency.create_date },
                ]
              }
            })
          if (currentHistory.length === 0) {
            await currencyHistoryRepository.history(code).create(new CurrencyHistoricFields(currency));
          }
        }
      },
      cronTime: '*/30 * * * * *',
      start: true,

    });
  }

  getCurrenciesString(): string {
    const coinsString = INITIAL_DATA
      .map((data) => data.code)
      .join(",");
    return coinsString;
  }
}
