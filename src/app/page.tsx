import Link from "next/link";
import { CandidatesSidebar } from "~/components/candidates/candidates-sidebar";

import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <CandidatesSidebar />
      <main>
        <h1>Hello</h1>
      </main>
    </HydrateClient>
  );
}
