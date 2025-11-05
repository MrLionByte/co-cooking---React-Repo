export class LocalStorageManager {
    private static readonly PREFIX = 'co_cooking_';

    static get<T>(key: string): T | null {
    const prefixedKey = this.PREFIX + key;
    try {
      const item = localStorage.getItem(prefixedKey);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
        } catch (error) {
      return null;
        }
    }

    static set<T>(key: string, value: T): boolean {
    const prefixedKey = this.PREFIX + key;
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(prefixedKey, serializedValue);
      return true;
        } catch (error) {
      return false;
        }
    }

    static delete(key: string): boolean {
    const prefixedKey = this.PREFIX + key;
    try {
      localStorage.removeItem(prefixedKey);
      return true;
        } catch (error) {
      return false;
        }
    }

    static edit<T extends object>(key: string, changes: Partial<T>): boolean {
    const existingData = this.get<T>(key);

    if (existingData === null) {
      return false;
    }

    if (typeof existingData !== 'object' || Array.isArray(existingData)) {
        return false;
    }

    const updatedData = {
      ...existingData,
      ...changes
    };

    return this.set(key, updatedData);
  }

  static clearAppItems(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
};