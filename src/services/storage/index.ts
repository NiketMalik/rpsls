class Storage {
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (err) {
      throw new Error(`StorageService: Failed to load ${key}`);
    }
  }

  async set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key: string) {
    localStorage.removeItem(key);
  }
}

export const storage = new Storage();
