import { useEffect } from "react";

export function useStorageListener(listener: () => void): void {
  useEffect(() => {
    chrome.storage.onChanged.addListener(listener);
    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, [listener]);
}
