import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countdowns",
  description: "Create and manage your countdowns to important events.",
};

export default function CountdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
