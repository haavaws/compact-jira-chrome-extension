import { useCallback, useEffect, useState } from "react";

import { getStoredToggle } from "./toggleUtils";
import { useStorageListener } from "../chrome/chromeHooks";

export function useToggle(name: string): boolean {
  const [toggle, setToggle] = useState<boolean>(false);

  const populateToggle = useCallback(() => {
    getStoredToggle(name).then((value) => {
      setToggle(value);
    });
  }, [name]);

  useEffect(() => {
    populateToggle();
  }, [populateToggle]);

  useStorageListener(populateToggle);

  return toggle;
}
