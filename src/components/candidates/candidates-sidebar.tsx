import { Home, PlusCircle, User } from "lucide-react";
import React from "react";
import * as SidebarComponent from "~/components/ui/sidebar";
import { api } from "~/trpc/server";
import type { TCandidate } from "~/types/candidates.types";

export async function CandidatesSidebar() {
  const appliedCandidates = await api.candidates.getCandidates();
  const selectedCandidates: TCandidate[] = [];

  return (
    <SidebarComponent.Sidebar>
      <SidebarComponent.SidebarHeader className="text-2xl font-bold">
        Skills Heatmap
      </SidebarComponent.SidebarHeader>
      <SidebarComponent.SidebarContent>
        <SidebarComponent.SidebarGroup>
          <SidebarComponent.SidebarGroupLabel className="flex justify-center">
            Selected candidates
          </SidebarComponent.SidebarGroupLabel>
          <SidebarComponent.SidebarGroupContent>
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
          <SidebarComponent.SidebarGroupLabel className="flex justify-center">
            Applied candidates
          </SidebarComponent.SidebarGroupLabel>
          <SidebarComponent.SidebarGroupContent>
            <SidebarComponent.SidebarMenu className="space-y-1 hover:cursor-pointer">
              {appliedCandidates.map((candidate) => (
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
              ))}
            </SidebarComponent.SidebarMenu>
          </SidebarComponent.SidebarGroupContent>
        </SidebarComponent.SidebarGroup>
      </SidebarComponent.SidebarContent>
      <SidebarComponent.SidebarFooter />
    </SidebarComponent.Sidebar>
  );
}
