export function serializeData<T>(value: T): string {
  return JSON.stringify(value);
}

export function deserializeData<T>(data: string | null): T | null {
  return data ? JSON.parse(data) : null;
}
