"use client";

import { MinusCircle, PlusCircle, User, type LucideIcon } from "lucide-react";
import React from "react";
import * as SidebarComponent from "~/components/ui/sidebar";
import { useCandidatesStore } from "~/providers/stores";
import { api } from "~/trpc/react";

function CandidateMenuItem({
  name,
  ActionIcon,
  action,
}: {
  name: string;
  ActionIcon: LucideIcon;
  action?: () => void;
}) {
  return (
    <SidebarComponent.SidebarMenuItem onClick={action}>
      <div className="flex flex-1 flex-col">
        <SidebarComponent.SidebarMenuButton asChild>
          <div className="flex w-full items-center justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <User className="shrink-0" />
              <p className="truncate">{name}</p>
            </div>
            <ActionIcon className="ml-2 shrink-0" />
          </div>
        </SidebarComponent.SidebarMenuButton>
      </div>
    </SidebarComponent.SidebarMenuItem>
  );
}

export function CandidatesSidebar() {
  const { selectedCandidates, selectCandidate, deselectCandidate } =
    useCandidatesStore((state) => state);
  const { data: appliedCandidates, isLoading } =
    api.candidates.getCandidates.useQuery();

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
                  <CandidateMenuItem
                    name={candidate.name}
                    key={candidate.id}
                    ActionIcon={MinusCircle}
                    action={() => deselectCandidate(candidate)}
                  />
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
                appliedCandidates
                  ?.filter(
                    (candidate) =>
                      !selectedCandidates.some(
                        (selected) => selected.id === candidate.id,
                      ),
                  )
                  ?.map((candidate) => (
                    <CandidateMenuItem
                      name={candidate.name}
                      key={candidate.id}
                      ActionIcon={PlusCircle}
                      action={() => selectCandidate(candidate)}
                    />
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
