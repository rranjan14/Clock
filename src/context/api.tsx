import {createContext} from 'react';
import {WORLD_TIME_API_BASE_URL} from '../util/constants';
import {TimezoneDetails} from '../util/types';

export interface IApiService {
  /**
   * Fetch all available timezones
   */
  fetchAllTimezones(): Promise<string[]>;
  /**
   * Fetch timezone details of selected timezone
   */
  fetchTimezoneDetails(area: string): Promise<TimezoneDetails>;
}

export class ApiService implements IApiService {
  async fetchAllTimezones(): Promise<string[]> {
    const res = await fetch(`${WORLD_TIME_API_BASE_URL}/timezone`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    return json as string[];
  }

  async fetchTimezoneDetails(timezone: string): Promise<TimezoneDetails> {
    const res = await fetch(`${WORLD_TIME_API_BASE_URL}/${timezone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    return json as TimezoneDetails;
  }
}

export const standardApiClient = new ApiService();
export const ApiContext = createContext<IApiService>(null as never);
