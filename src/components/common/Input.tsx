import { ComponentProps } from "react";

export interface InputProps extends ComponentProps<"input"> {}

export const Input = (props: InputProps) => {
  return <input className="input-header" {...props} />;
};
