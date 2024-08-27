import React, { useCallback } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { dsColor } from "~/designSystem/01-quarks";
import { DsInput, DsInputProps } from "./DsInput.base";
import { DsInputType } from "./DsInput.constants";

export interface DsInputPropsHooked extends Omit<DsInputProps, "error"> {
  /** The input name, as used by react-hook-form */
  name: string;
  /** The react-hook-form form control */
  control: Control<any>;
  rules?: RegisterOptions;
}

const transformInputType = (value, inputType?: DsInputType) => {
  if (!inputType) {
    return value;
  }

  if (inputType === DsInputType.NUMBER && typeof value === "string") {
    if (!value) {
      return null;
    }
    const result = parseInt(value);
    if (!isNaN(result)) {
      return result;
    }
    return null;
  }

  return value;
};

/** Text input field. */
export const DsInputHooked: React.FC<DsInputPropsHooked> = ({
  name,
  control,
  onBlur,
  onChangeText,
  rules,
  ...otherProps
}) => {
  const { field, fieldState } = useController({ name, control, rules });

  const handleBlur = useCallback(
    (e) => {
      e = transformInputType(e, otherProps.type);
      if (typeof onBlur === "function") onBlur(e);
      field.onBlur();
    },
    [onBlur, field.onBlur]
  );
  const handleChange = useCallback(
    (e) => {
      e = transformInputType(e, otherProps.type);

      if (typeof onChangeText === "function") onChangeText(e);
      field.onChange(e);
    },
    [onChangeText, field.onChange]
  );

  return (
    <DsInput
      styles={
        !!fieldState.error
          ? {
              inputBody: {
                borderColor: dsColor.RED,
              },
            }
          : {}
      }
      {...otherProps}
      {...field}
      value={field.value?.toString()}
      error={fieldState.error}
      onBlur={handleBlur}
      onChangeText={handleChange}
    />
  );
};
