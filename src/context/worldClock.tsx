import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TimezoneDetails} from '../util/types';
import {ApiContext} from './api';
import {STORAGE_KEY} from '../util/constants';

export interface IWorldClockService {
  /**
   * Keeps time related data for the local timezone.
   */
  localTimezoneDetails: TimezoneDetails | null;
  /**
   * Keeps time related data for the selected timezone.
   */
  savedTimezoneDetails: TimezoneDetails[];

  /**
   * All available timezones
   */
  allAvailableTimezones: string[];

  /**
   * Adds a new timezone to existing data.
   */
  addTimezone: (tz: string) => Promise<void>;
  /**
   * Removes a timezone from existing data
   */
  removeTimezone: (tz: string) => void;

  /**
   * Sets details of local timezone
   */
  setLocalTimezoneDetails: (tzDetails: TimezoneDetails) => void;
}

export const WorldClockContext = createContext<IWorldClockService>(
  null as never,
);

export const WorldClockContextProvider = React.memo(
  function WorldClockContextProvider({children}: {children: React.ReactNode}) {
    const [localTimezoneDetails, setLocalTimezoneDetails] =
      useState<TimezoneDetails | null>(null);
    const [savedTimezoneDetails, setSavedTimezoneDetails] = useState<
      TimezoneDetails[]
    >([]);
    const [allAvailableTimezones, setAllAvailableTimezones] = useState<
      string[]
    >([]);

    const apiCtx = useContext(ApiContext);

    const worldClockService = useMemo<IWorldClockService>(() => {
      return {
        localTimezoneDetails,
        savedTimezoneDetails,
        allAvailableTimezones: allAvailableTimezones,
        removeTimezone(tz: string) {
          const newTzDetails = savedTimezoneDetails.filter(
            timeZone => timeZone.timezone !== tz,
          );
          setSavedTimezoneDetails(newTzDetails);
          AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTzDetails));
        },
        async addTimezone(tz: string) {
          const tzDetails = await apiCtx
            .fetchTimezoneDetails(tz)
            .then(res => res)
            .catch(_err => null);
          if (tzDetails) {
            const newTzDetails = [...savedTimezoneDetails, tzDetails];
            setSavedTimezoneDetails(newTzDetails);
            await AsyncStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(newTzDetails),
            );
          } else {
            Alert.alert(
              'Error',
              'Could not add the selected timezone. Please try again',
            );
          }
        },
        setLocalTimezoneDetails(tzDetails: TimezoneDetails) {
          setLocalTimezoneDetails(tzDetails);
        },
      };
    }, [
      apiCtx,
      localTimezoneDetails,
      savedTimezoneDetails,
      allAvailableTimezones,
    ]);

    useEffect(() => {
      (async () => {
        const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const localTimezoneDetailsResponse = await apiCtx
          .fetchTimezoneDetails(localTimezone)
          .then(res => res)
          .catch(_err => null);
        setLocalTimezoneDetails(localTimezoneDetailsResponse);
        const allTimezones = await apiCtx
          .fetchAllTimezones()
          .then(res => res)
          .catch(_err => [] as string[]);
        setAllAvailableTimezones(allTimezones);
        const locallySavedList = await AsyncStorage.getItem(STORAGE_KEY);
        if (locallySavedList) {
          const savedTzDetails = JSON.parse(
            locallySavedList,
          ) as TimezoneDetails[];
          setSavedTimezoneDetails(savedTzDetails);
        }
      })();
    }, [apiCtx]);

    return (
      <WorldClockContext.Provider value={worldClockService}>
        {children}
      </WorldClockContext.Provider>
    );
  },
);
