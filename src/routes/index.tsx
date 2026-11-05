import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/afaq/Shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Shell />;
}
