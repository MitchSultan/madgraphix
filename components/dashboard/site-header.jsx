import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import {BackButton} from "./ui/backbutton"
import { NotificationBell } from "@/components/dashboard/notification-bell";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <BackButton />

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <NotificationBell />
        {/* <h1 className="text-base font-medium">Docu</h1> */}
      </div>
    </header>
  )
}
