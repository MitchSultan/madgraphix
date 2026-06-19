// "use client"

// import { Badge } from "./ui/badge"
// import {
//   Card,
//   CardAction,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card"
// import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"
// import {supabaseBrowser} from "@/lib/supabase/client";






// export function SectionCards() {
//   return (
//     <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
//       <Card className="@container/card">
//         <CardHeader>
//           <CardDescription>Real Money</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             $1,250.00
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <TrendingUpIcon
//               />
//               +12.5%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Trending up this month{" "}
//             <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">
//             Visitors for the last 6 months
//           </div>
//         </CardFooter>
//       </Card>
//       <Card className="@container/card">
//         <CardHeader>
//           <CardDescription>New Customers</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             1,234
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <TrendingDownIcon
//               />
//               -20%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Down 20% this period{" "}
//             <TrendingDownIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">
//             Acquisition needs attention
//           </div>
//         </CardFooter>
//       </Card>
//       <Card className="@container/card">
//         <CardHeader>
//           <CardDescription>Active Accounts</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             45,678
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <TrendingUpIcon
//               />
//               +12.5%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Strong user retention{" "}
//             <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Engagement exceed targets</div>
//         </CardFooter>
//       </Card>
//       <Card className="@container/card">
//         <CardHeader>
//           <CardDescription>Growth Rate</CardDescription>
//           <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
//             4.5%
//           </CardTitle>
//           <CardAction>
//             <Badge variant="outline">
//               <TrendingUpIcon
//               />
//               +4.5%
//             </Badge>
//           </CardAction>
//         </CardHeader>
//         <CardFooter className="flex-col items-start gap-1.5 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Steady performance increase{" "}
//             <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Meets growth projections</div>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }



"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client.js";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Package,
  Receipt,
  ShoppingCart,
  Users,
  TrendingUpIcon,
} from "lucide-react";

// Helper to format numbers with commas
const formatNumber = (num) =>
  num?.toLocaleString() ?? "0";

export function SectionCards() {
  const [productsCount, setProductsCount] = useState(null);
  const [invoicesPaidCount, setInvoicesPaidCount] = useState(
    null
  );
  const [ordersCount, setOrdersCount] = useState(null);
  const [subscribersCount, setSubscribersCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        // Use count: 'exact' with head: true to get only the count
        const supabase = supabaseBrowser(); // or create a new client if needed
        const [
          productsResult,
          invoicesResult,
          ordersResult,
          subscribersResult,
        ] = await Promise.all([
          supabase
            .from("products")
            .select("*", { count: "exact", head: true }),
          supabase
            .from("invoices")
            .select("*", { count: "exact", head: true })
            .eq("status", "paid"), // adjust column/status as needed
          supabase
            .from("orders")
            .select("*", { count: "exact", head: true }),
          supabase
            .from("subscribers") // or from('users').eq('role', 'subscriber')
            .select("*", { count: "exact", head: true }),
        ]);

        // Throw if any request failed
        if (productsResult.error) throw productsResult.error;
        if (invoicesResult.error) throw invoicesResult.error;
        if (ordersResult.error) throw ordersResult.error;
        if (subscribersResult.error) throw subscribersResult.error;

        setProductsCount(productsResult.count ?? 0);
        setInvoicesPaidCount(invoicesResult.count ?? 0);
        setOrdersCount(ordersResult.count ?? 0);
        setSubscribersCount(subscribersResult.count ?? 0);
      } catch (err) {
        console.error("Failed to fetch KPIs:", err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-8 w-32 bg-muted rounded mt-2" />
            </CardHeader>
            <CardFooter>
              <div className="h-4 w-40 bg-muted rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">
        <p>Could not load KPIs: {error}</p>
      </div>
    );
  }

  // Define card data
  const cards = [
    {
      title: "Total Products",
      value: formatNumber(productsCount ?? 0),
      description: "All products in inventory",
      icon: <Package className="size-4" />,
      trend: "Total",
    },
    {
      title: "Paid Invoices",
      value: formatNumber(invoicesPaidCount ?? 0),
      description: "Invoices marked as paid",
      icon: <Receipt className="size-4" />,
      trend: "Paid",
    },
    {
      title: "Total Orders",
      value: formatNumber(ordersCount ?? 0),
      description: "All orders placed",
      icon: <ShoppingCart className="size-4" />,
      trend: "All",
    },
    {
      title: "Subscribers",
      value: formatNumber(subscribersCount ?? 0),
      description: "Active subscribers",
      icon: <Users className="size-4" />,
      trend: "Active",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {cards.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1">
                <TrendingUpIcon className="size-3" />
                {card.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.icon}
              {card.description}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}