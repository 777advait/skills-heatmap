"use client";

import { Home, Loader2, PlusCircle, User } from "lucide-react";
import React from "react";
import * as SidebarComponent from "~/components/ui/sidebar";
import { api } from "~/trpc/react";
import type { TCandidate } from "~/types/candidates.types";

export function CandidatesSidebar() {
  const { data: appliedCandidates, isLoading } =
    api.candidates.getCandidates.useQuery();
  const selectedCandidates: TCandidate[] = [];

  return (
    <SidebarComponent.Sidebar>
      <SidebarComponent.SidebarHeader className="text-2xl font-bold">
        Skills Heatmap
      </SidebarComponent.SidebarHeader>
      <SidebarComponent.SidebarContent>
        <SidebarComponent.SidebarGroup>
          <SidebarComponent.SidebarGroupLabel className="text-foreground flex justify-center text-xl font-semibold">
            Selected candidates
          </SidebarComponent.SidebarGroupLabel>
          <SidebarComponent.SidebarGroupContent className="mt-3">
            {selectedCandidates.length !== 0 ? (
              <SidebarComponent.SidebarMenu className="space-y-1 hover:cursor-pointer">
                {selectedCandidates.map((candidate) => (
                  <SidebarComponent.SidebarMenuItem key={candidate.id}>
                    <SidebarComponent.SidebarMenuButton asChild>
                      <div>
                        <User />
                        <span>{candidate.name}</span>
                      </div>
                    </SidebarComponent.SidebarMenuButton>
                  </SidebarComponent.SidebarMenuItem>
                ))}
              </SidebarComponent.SidebarMenu>
            ) : (
              <p className="text-muted-foreground text-center">
                No candidates selected
              </p>
            )}
          </SidebarComponent.SidebarGroupContent>
        </SidebarComponent.SidebarGroup>
        <SidebarComponent.SidebarSeparator />
        <SidebarComponent.SidebarGroup>
          <SidebarComponent.SidebarGroupLabel className="text-foreground flex justify-center text-xl font-semibold">
            Applied candidates
          </SidebarComponent.SidebarGroupLabel>
          <SidebarComponent.SidebarGroupContent className="mt-3">
            <SidebarComponent.SidebarMenu className="space-y-1 hover:cursor-pointer">
              {isLoading ? (
                <p className="text-muted-foreground animate-pulse text-center">
                  Loading candidates...
                </p>
              ) : (
                appliedCandidates?.map((candidate) => (
                  <SidebarComponent.SidebarMenuItem key={candidate.id}>
                    <div className="flex flex-1 flex-col">
                      <SidebarComponent.SidebarMenuButton asChild>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex min-w-0 items-center gap-2">
                            <User className="shrink-0" />
                            <p className="truncate">{candidate.name}</p>
                          </div>
                          <PlusCircle className="ml-2 shrink-0" />
                        </div>
                      </SidebarComponent.SidebarMenuButton>
                    </div>
                  </SidebarComponent.SidebarMenuItem>
                ))
              )}
            </SidebarComponent.SidebarMenu>
          </SidebarComponent.SidebarGroupContent>
        </SidebarComponent.SidebarGroup>
      </SidebarComponent.SidebarContent>
      <SidebarComponent.SidebarFooter />
    </SidebarComponent.Sidebar>
  );
}
