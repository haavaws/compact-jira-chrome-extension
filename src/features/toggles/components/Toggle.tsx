import { FormControlLabel, Switch } from "@mui/material";

import React from "react";
import { toggleChangeHandler } from "../toggleUtils";
import { useToggle } from "../toggleHooks";

type Props = {
  name: string;
  label: string;
};

export function Toggle({ name, label }: Props): React.ReactElement {
  const toggled = useToggle(name);

  return (
    <FormControlLabel
      control={
        <Switch id={name} checked={toggled} onChange={toggleChangeHandler} />
      }
      label={label}
    />
  );
}
