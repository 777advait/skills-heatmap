import React from "react";
import { CandidatesStoreProvider } from "./stores";
import { TRPCReactProvider } from "~/trpc/react";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <CandidatesStoreProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </CandidatesStoreProvider>
    </TRPCReactProvider>
  );
}
