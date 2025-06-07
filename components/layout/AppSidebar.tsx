import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1>Setting</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Button variant="outline">Show Sesimic Chart</Button>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
