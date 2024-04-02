import { DetailedHTMLProps, HTMLAttributes } from "react";

type ButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant: "primary" | "secondary";
};

export default function Button(props: ButtonProps) {
  return (
    <button data-component="button" data-variant={props.variant} {...props}>
      {props.children}
    </button>
  );
}
