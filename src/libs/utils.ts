import { IDictionary } from '@/types';

export function objectToArrayObject(obj: Object): IDictionary[] {
  return Object.entries(obj).map(([key, value]) => ({
    key,
    value,
  }));
}
