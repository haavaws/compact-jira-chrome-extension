export async function getStoredValues(
  keys: string[]
): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => resolve(result));
  });
}

export async function getStoredValue(name: string): Promise<unknown> {
  return new Promise((resolve) => {
    chrome.storage.local.get(name, (result) => resolve(result[name]));
  });
}

export async function setStoredValue(name: string, value: any): Promise<void> {
  return new Promise<void>((resolve) => {
    chrome.storage.local.set({ [name]: value }, () => resolve());
  });
}
