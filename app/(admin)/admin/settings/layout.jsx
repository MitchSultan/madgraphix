// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { createClient } from "@/lib/supabase/server"; // server client for auth

// export default async function SettingsLayout({
//   children,
// }) {
//   const supabase = createClient();
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) redirect('/login');

//   // Get user role from profiles
//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('role')
//     .eq('id', user.id)
//     .single();

//   const isAdmin = profile?.role === 'admin';

//   return (
//     <div className="container max-w-5xl py-10">
//       <h1 className="text-3xl font-bold mb-2">Settings</h1>
//       <p className="text-muted-foreground mb-6">Manage your account and team</p>

//       <Tabs defaultValue="profile" className="space-y-6">
//         <TabsList>
//           <TabsTrigger value="profile" asChild>
//             <Link href="/settings/profile">Profile</Link>
//           </TabsTrigger>
//           <TabsTrigger value="security" asChild>
//             <Link href="/settings/security">Security</Link>
//           </TabsTrigger>
//           {isAdmin && (
//             <TabsTrigger value="team" asChild>
//               <Link href="/settings/team">Team</Link>
//             </TabsTrigger>
//           )}
//         </TabsList>

//         {children}
//       </Tabs>
//     </div>
//   );
// }


'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useUser } from "@/components/dashboard/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLayout({
  children,
}) {
  const { profile, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="container max-w-5xl py-10">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-64 mb-6" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-96 mt-6" />
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="container max-w-5xl p-10">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-6">Manage your account and team</p>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" asChild>
            <Link href="/admin/settings/profile">Profile</Link>
          </TabsTrigger>
          <TabsTrigger value="security" asChild>
            <Link href="/admin/settings/security">Security</Link>
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="team" asChild>
              <Link href="/admin/settings/team">Team</Link>
            </TabsTrigger>
          )}
        </TabsList>

        {children}
      </Tabs>
    </div>
  );
}