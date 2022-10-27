import { getStoredValue, setStoredValue } from "../chrome/chromeUtils";

import { ChangeEvent } from "react";

export async function getStoredToggle(name: string): Promise<boolean> {
  return getStoredValue(name) as Promise<boolean>;
}

export function toggleChangeHandler(event: ChangeEvent<HTMLInputElement>) {
  setStoredValue(event.target.id, event.target.checked);
}
