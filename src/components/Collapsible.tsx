import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from "react";
import { ChevronDownCircle } from "lucide-react";

type ButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement> & {
  title: string;
};

export default function Collapsible(props: ButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDetailsElement>();

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const toggle = () => setOpen(target.open);

    target.addEventListener("toggle", toggle);
    return () => removeEventListener("toggle", toggle);
  }, [ref]);

  return (
    <details data-component="collapsible" data-open={String(open)} ref={ref as any} {...props}>
      <summary>
        <b>{props.title}</b>
        <ChevronDownCircle />
      </summary>

      {props.children}
    </details>
  );
}
