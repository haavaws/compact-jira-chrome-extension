import {
  FOOTER_CLASS,
  HIGHLIGHT_CLASS,
  ISSUE_NUMBER_CLASS,
  META_CLASS,
} from "../toggleConstants";

import { FormGroup } from "@mui/material";
import React from "react";
import { Toggle } from "./Toggle";

export function Toggles(): React.ReactElement {
  return (
    <FormGroup>
      <Toggle name={FOOTER_CLASS} label="Footer" />
      <Toggle name={META_CLASS} label="Meta fields" />
      <Toggle name={HIGHLIGHT_CLASS} label="Highlited fields" />
      <Toggle name={ISSUE_NUMBER_CLASS} label="Issue number" />
    </FormGroup>
  );
}
