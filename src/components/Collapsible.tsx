import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from "react";
import { ChevronDownCircle } from "lucide-react";

type CollapsibleProps = DetailedHTMLProps<HTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement> & {
  title: string;
  label?: string;
};

export default function Collapsible(props: CollapsibleProps) {
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
        <b>
          {props.title} {props.label && <small>{props.label}</small>}
        </b>
        <ChevronDownCircle />
      </summary>

      {props.children}
    </details>
  );
}
