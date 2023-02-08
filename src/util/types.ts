export type TimezoneDetails = {
  abbreviation: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: string;
  dst_offset: number;
  dst_until: string;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
};

export type Timer = {
  id: string;
  seconds: number;
  startFrom: number;
  running: boolean;
};

export enum Time {
  Hour = 'hour',
  Min = 'min',
  Sec = 'sec',
}

export enum ComponentType {
  Input = 'input',
  Timer = 'timer',
}
