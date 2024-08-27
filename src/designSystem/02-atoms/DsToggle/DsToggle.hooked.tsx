import React, { useCallback } from "react";
import { Control, useController } from "react-hook-form";
import { DsToggle, DsToggleProps } from "./DsToggle.base";

export interface DsTogglePropsHooked extends Omit<DsToggleProps, "error"> {
  /** The toggle name, as used by react-hook-form */
  name: string;
  /** The react-hook-form form control */
  control: Control<any>;

  possibleValues?: [string | boolean, string | boolean];
}

/** Toggle field. */
export const DsToggleHooked: React.FC<DsTogglePropsHooked> = ({
  name,
  control,
  possibleValues = [false, true],
  onValueChange,
  ...otherProps
}) => {
  const { field, fieldState } = useController({ name, control });

  const handleChange = useCallback(
    (e) => {
      const newValue = e ? possibleValues[1] : possibleValues[0];

      if (typeof onValueChange === "function") onValueChange(e);
      field.onChange(newValue);
    },
    [onValueChange, field.onChange]
  );

  return (
    <DsToggle
      {...otherProps}
      {...field}
      value={field.value === possibleValues[1]}
      error={fieldState.error}
      onValueChange={handleChange}
    />
  );
};
