// "use client";

// import { useEffect, useState } from "react";
// import { supabaseBrowser } from "@/lib/supabase/client";
// import { BellIcon, CheckIcon, CheckCheckIcon } from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { formatDistanceToNow } from "date-fns";
// import { cn } from "@/lib/utils";

// export function NotificationBell() {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const supabase = supabaseBrowser();

//   // Fetch notifications
//   const fetchNotifications = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;

//     const { data, error } = await supabase
//       .from("notifications")
//       .select("*")
//       .eq("user_id", user.id)
//       .order("created_at", { ascending: false })
//       .limit(20);

//     if (error) {
//       console.error("Error fetching notifications:", error);
//       return;
//     }

//     setNotifications(data || []);
//     setUnreadCount(data?.filter((n) => !n.read).length || 0);
//     setLoading(false);
  
//   };
//   // Subscribe to real-time changes
//   useEffect( () => {
//     const fetchAndSubscribe = async () => {
//       await fetchNotifications();
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;}

//     // const { data: { user } } = await supabase.auth.getUser();
//     // if (!user) return;

//     const channel = supabase
//       .channel("notifications-channel")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "notifications",
//           filter: `user_id=eq.${user.id}`,
//         },
//         (payload) => {
//           // New notification – add to list and update count
//           setNotifications((prev) => [payload.new, ...prev]);
//           setUnreadCount((prev) => prev + 1);
//         }
//       )
//       .on(
//         "postgres_changes",
//         {
//           event: "UPDATE",
//           schema: "public",
//           table: "notifications",
//           filter: `user_id=eq.${user.id}`,
//         },
//         (payload) => {
//           // Update read status in the list
//           setNotifications((prev) =>
//             prev.map((n) => (n.id === payload.new.id ? payload.new : n))
//           );
//           setUnreadCount(
//             (prev) =>
//               prev + (payload.new.read ? -1 : 1) // adjust count based on change
//           );
//         }
//       )
//       .subscribe();

//     return () => {
//       channel.unsubscribe();
//     };

//   }, []);

//   // Mark a single notification as read
//   const markAsRead = async (id) => {
//     const { error } = await supabase
//       .from("notifications")
//       .update({ read: true })
//       .eq("id", id);
//     if (error) console.error("Error marking as read:", error);
//     // The real-time update will handle the UI
//   };

//   // Mark all as read
//   const markAllAsRead = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;
//     const { error } = await supabase
//       .from("notifications")
//       .update({ read: true })
//       .eq("user_id", user.id)
//       .eq("read", false);
//     if (error) console.error("Error marking all as read:", error);
//   };

//   const handleOpenChange = (newOpen) => {
//     setOpen(newOpen);
//     if (newOpen) {
//       // Optionally auto-mark as read when opened? Better to let user click.
//       // We'll just load fresh data if needed.
//     }
//   };

//   return (
//     <Popover open={open} onOpenChange={handleOpenChange}>
//       <PopoverTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <BellIcon className="size-5" />
//           {unreadCount > 0 && (
//             <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
//               {unreadCount > 9 ? "9+" : unreadCount}
//             </span>
//           )}
//           <span className="sr-only">Notifications</span>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-0" align="end">
//         <div className="flex items-center justify-between border-b px-4 py-2">
//           <span className="font-medium">Notifications</span>
//           {unreadCount > 0 && (
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-xs"
//               onClick={markAllAsRead}
//             >
//               <CheckCheckIcon className="mr-1 size-3" />
//               Mark all read
//             </Button>
//           )}
//         </div>
//         <ScrollArea className="h-72">
//           {loading ? (
//             <div className="p-4 text-center text-sm text-muted-foreground">
//               Loading...
//             </div>
//           ) : notifications.length === 0 ? (
//             <div className="p-4 text-center text-sm text-muted-foreground">
//               No notifications yet
//             </div>
//           ) : (
//             <div className="divide-y">
//               {notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className={cn(
//                     "flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50",
//                     !notification.read && "bg-muted/30"
//                   )}
//                   onClick={() => {
//                     if (!notification.read) markAsRead(notification.id);
//                     if (notification.link) {
//                       // Navigate to link
//                       window.location.href = notification.link;
//                     }
//                   }}
//                 >
//                   <div className="flex-1 space-y-1">
//                     <p className="text-sm font-medium leading-none">
//                       {notification.title}
//                     </p>
//                     {notification.body && (
//                       <p className="text-xs text-muted-foreground line-clamp-2">
//                         {notification.body}
//                       </p>
//                     )}
//                     <p className="text-xs text-muted-foreground">
//                       {formatDistanceToNow(new Date(notification.created_at), {
//                         addSuffix: true,
//                       })}
//                     </p>
//                   </div>
//                   {!notification.read && (
//                     <div className="mt-1 size-2 shrink-0 rounded-full bg-blue-500" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </ScrollArea>
//       </PopoverContent>
//     </Popover>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { BellIcon, CheckCheckIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const supabase = supabaseBrowser();

  // Fetch notifications and subscribe
  useEffect(() => {
    let isMounted = true;
    let channel = null;

    const init = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setLoading(false);
        return;
      }

      // Fetch notifications
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
        return;
      }

      if (isMounted) {
        setNotifications(data || []);
        setUnreadCount(data?.filter((n) => !n.read).length || 0);
        setLoading(false);
      }

      // Subscribe to real-time changes
      channel = supabase
        .channel(`notifications-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            if (isMounted) {
              setNotifications((prev) => [payload.new, ...prev]);
              setUnreadCount((prev) => prev + 1);
            }
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            if (isMounted) {
              setNotifications((prev) => {
                const updated = prev.map((n) =>
                  n.id === payload.new.id ? payload.new : n
                );
                setUnreadCount(updated.filter((n) => !n.read).length);
                return updated;
              });
            }
          }
        )
        .subscribe();
    };

    init();

    return () => {
      isMounted = false;
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, []);

  // Mark a single notification as read
  const markAsRead = async (id) => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);
    if (error) console.error("Error marking as read:", error);
  };

  // Mark all as read
  const markAllAsRead = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false);
    if (error) console.error("Error marking all as read:", error);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    // Optionally refresh data when opened? Already listening to realtime.
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="font-medium">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={markAllAsRead}
            >
              <CheckCheckIcon className="mr-1 size-3" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-72">
          {loading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50",
                    !notification.read && "bg-muted/30"
                  )}
                  onClick={() => {
                    if (!notification.read) markAsRead(notification.id);
                    if (notification.link) {
                      window.location.href = notification.link;
                    }
                  }}
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    {notification.body && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.body}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="mt-1 size-2 shrink-0 rounded-full bg-blue-500" />
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}