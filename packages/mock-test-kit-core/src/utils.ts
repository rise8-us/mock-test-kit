import { IMatcher } from './types';

export const isMatcher = (value: unknown) => {
  return value && value.constructor.name === 'Matcher';
};

export const toStringNestedMatchers = (record: Record<string, unknown>) => {
  const newRecord = Object.assign({}, record);

  for (const k of Object.keys(newRecord)) {
    if (isMatcher(newRecord[k])) {
      newRecord[k] = (newRecord[k] as IMatcher).toString();
    }

    if (typeof newRecord[k] === 'object') {
      newRecord[k] = toStringNestedMatchers(
        newRecord[k] as Record<string, unknown>,
      );
    }
  }

  return newRecord;
};
