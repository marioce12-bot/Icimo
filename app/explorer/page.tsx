import type { Metadata } from "next";
import IcimoApp from "@/components/IcimoApp";

export const metadata: Metadata = {
  title: "Explorer les logements — ICIMO",
};

export default function ExplorerPage() {
  return <IcimoApp initialView="app" />;
}
