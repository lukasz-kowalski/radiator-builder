import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return <div className="mt-4 px-6 py-2 rounded-md border-1">{children}</div>;
}
