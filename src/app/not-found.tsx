import Link from "next/link";
import Button from "@/components/Button";

/* eslint-disable @next/next/no-img-element */
export default function Error() {
  return (
    <div className="error-page">
      <img src="https://http.cat/404" alt="404: Not Found" />

      <Link href="/">
        <Button variant="primary">Back to home</Button>
      </Link>
    </div>
  );
}
