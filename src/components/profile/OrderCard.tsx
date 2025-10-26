import { motion } from 'framer-motion';
import { Package, CheckCircle, Truck, XCircle } from 'lucide-react';
import type { Order } from '@/stores/orderStore';

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  pending: { icon: Package, color: 'text-yellow-500', label: 'Pending' },
  processing: { icon: Package, color: 'text-blue-500', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-purple-500', label: 'Shipped' },
  delivered: { icon: CheckCircle, color: 'text-green-500', label: 'Delivered' },
  cancelled: { icon: XCircle, color: 'text-red-500', label: 'Cancelled' },
};

export function OrderCard({ order }: OrderCardProps) {
  const StatusIcon = statusConfig[order.status].icon;
  const statusColor = statusConfig[order.status].color;
  const statusLabel = statusConfig[order.status].label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIcon className={`h-5 w-5 ${statusColor}`} />
          <span className={`text-sm font-medium ${statusColor}`}>{statusLabel}</span>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <img src={item.image} alt={item.title} className="h-12 w-12 rounded object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                Qty: {item.quantity} × {item.price}₺
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          <p>{order.shippingAddress}</p>
          <p>{order.paymentMethod}</p>
        </div>
        <p className="text-lg font-bold">{order.total}₺</p>
      </div>
    </motion.div>
  );
}
