import React, {createContext, useMemo, useState} from 'react';
import type {Timer} from '../util/types';
import {v4 as uuidv4} from 'uuid';

export interface ITimerService {
  /**
   *
   * @param seconds total number of seconds the timer will last for
   * @returns a new timer
   */
  createTimer: (seconds: number) => string;
  /**
   *
   * @returns All the available timers
   */
  getTimers: () => Timer[];
  /**
   *
   * @param id Id of the timer to fetch
   * @returns Timer if found, null otherwise
   */
  getTimer: (id: string) => Timer | null;
  /**
   *
   * @param id Id of the timer to update
   * @returns Updated timer
   */
  updateTimer: (id: string, timer: Timer) => void;
  /**
   *
   * @param id Id of the timer to delete
   * @returns nothing
   */
  deleteTimer: (id: string) => void;
}

export const TimerContext = createContext<ITimerService>(null as never);

export const TimerContextProvider = React.memo(function TimerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const timerService = useMemo<ITimerService>(() => {
    return {
      getTimers() {
        return timers;
      },
      createTimer(seconds) {
        const id = uuidv4();
        const newTimer: Timer = {
          id: id,
          running: false,
          seconds: seconds,
          startFrom: 0,
        };
        setTimers([newTimer, ...timers]);
        return id;
      },
      getTimer(id) {
        const foundTimer = timers.find(t => t.id === id);
        if (foundTimer) {
          return foundTimer;
        }
        return null;
      },
      deleteTimer(id) {
        const newTimers = timers.filter(t => t.id !== id);
        setTimers(newTimers);
      },
      updateTimer(id, timer) {
        setTimers(timers.map(x => (x.id === id ? {...x, ...timer} : x)));
      },
    };
  }, [timers]);

  return (
    <TimerContext.Provider value={timerService}>
      {children}
    </TimerContext.Provider>
  );
});
