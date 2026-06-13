
// app/client/[clientId]/page.js
import { supabaseBrowser } from '@/app/lib/supabase/client'; // Assuming you have a supabase client utility
import { cn } from '@/app/lib/utils'; // Assuming you have a utility for class name concatenation

async function getClientOrders(clientId) {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('orders')
    .select('order_date, status')
    .eq('client_id', clientId)
    .order('order_date', { ascending: false });

  if (error) {
    console.error('Error fetching client orders:', error);
    return [];
  }
  return data;
}

const calculateOrderTrends = (orders) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let currentPeriodOrders = 0;
  let previousPeriodOrders = 0;

  orders.forEach(order => {
    const orderDate = new Date(order.order_date);
    if (orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear) {
      currentPeriodOrders++;
    } else if (orderDate.getMonth() === (currentMonth === 0 ? 11 : currentMonth - 1) && orderDate.getFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear)) {
      previousPeriodOrders++;
    }
  });

  const trend = currentPeriodOrders - previousPeriodOrders;
  const trendColor = trend > 0 ? 'text-green-500' : (trend < 0 ? 'text-red-500' : 'text-gray-500');
  const trendIndicator = trend > 0 ? '↑' : (trend < 0 ? '↓' : '—');

  return {
    totalOrders: currentPeriodOrders,
    trend: trendIndicator,
    trendColor: trendColor,
  };
};

export default async function ClientDashboardPage({ params }) {
  const { clientId } = params;
  const orders = await getClientOrders(clientId);
  const { totalOrders, trend, trendColor } = calculateOrderTrends(orders);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Welcome, Client {clientId}</h1>
      <p className="text-gray-500 mt-1">Here's an overview of your recent orders.</p>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="flex items-center mt-4">
          <p className="text-3xl font-bold">{totalOrders}</p>
          <span className={cn("ml-2 text-lg font-medium", trendColor)}>{trend}</span>
          <p className="ml-1 text-gray-500">orders this month</p>
        </div>
        {/* You can add more detailed stats here */}
      </div>

      {/* Example of displaying recent orders */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          {orders.length > 0 ? (
            <ul>
              {orders.slice(0, 5).map((order, index) => (
                <li key={index} className="py-2 border-b last:border-b-0">
                  Order Date: {new Date(order.order_date).toLocaleDateString()} - Status: {order.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}