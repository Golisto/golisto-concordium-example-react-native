import * as React from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Noop,
  RefCallBack,
  useForm,
  UseFormProps,
  UseFormReturn,
  UseFormStateReturn,
} from "react-hook-form";

export type ControllerRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  onChange: (data: FieldPathValue<TFieldValues, TName>) => void;
  onBlur: Noop;
  value: FieldPathValue<TFieldValues, TName>;
  name: TName;
  ref: RefCallBack;
};

export type UseFormRender<TFieldValues extends FieldValues> = <
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  name: TFieldName,
  render: (options: {
    field: ControllerRenderProps<TFieldValues, TFieldName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactElement<TFieldValues>,
  props?: Pick<
    ControllerProps<TFieldValues, TFieldName>,
    "rules" | "defaultValue" | "shouldUnregister"
  >
) => JSX.Element;

export type UseMFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = UseFormReturn<TFieldValues, TContext> & {
  render: UseFormRender<TFieldValues>;
};

export default function useMForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(
  props: UseFormProps<TFieldValues, TContext> = {}
): UseMFormReturn<TFieldValues, TContext> {
  const form = useForm<TFieldValues>(props) as UseMFormReturn<TFieldValues>;

  const render: UseFormRender<TFieldValues> = (name, render, props) => (
    <Controller {...props} control={form.control} name={name} render={render} />
  );

  form.render = render;

  return form;
}
