"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { getProviderOrders, updateOrderStatus } from "@/services/ProviderService";

const NEXT_STATUS: Record<string, string> = {
  PLACED: "CONFIRMED",
  PAID: "PICKED_UP",
  PICKED_UP: "RETURNED",
};

const ACTION_LABEL: Record<string, string> = {
  PLACED: "Confirm",
  PAID: "Mark Picked Up",
  PICKED_UP: "Mark Returned",
};

const STATUS_COLOR: Record<string, string> = {
  PLACED: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PAID: "bg-purple-100 text-purple-700",
  PICKED_UP: "bg-emerald-100 text-emerald-700",
  RETURNED: "bg-slate-100 text-slate-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function ProviderOrdersPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["provider-orders"],
    queryFn: () => getProviderOrders().then((r) => r.data),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success("Order updated");
      queryClient.invalidateQueries({ queryKey: ["provider-orders"] });
    },
    onError: (err: Error) => toast.error(err.message || "Failed to update order"),
  });

  if (isLoading) {
    return <div className="p-6 text-slate-500">Loading orders...</div>;
  }

  const orders = data ?? [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Rental Requests</h1>

      <div className="rounded-xl border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gear</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const nextStatus = NEXT_STATUS[order.status];

              const anyOrder = order as unknown as {
                gearItem?: { name?: string };
                gear?: { name?: string };
                gearName?: string;
                items?: Array<{
                  gear?: { name?: string };
                  gearItem?: { name?: string };
                }>;
                customer?: { name?: string };
                user?: { name?: string };
                totalPrice?: number;
              };

              const gearName =
                anyOrder.gearItem?.name ||
                anyOrder.gear?.name ||
                anyOrder.gearName ||
                anyOrder.items?.[0]?.gear?.name ||
                anyOrder.items?.[0]?.gearItem?.name ||
                "—";

              const customerName =
                anyOrder.customer?.name || anyOrder.user?.name || "—";

              const price = anyOrder.totalPrice ?? Number(order.totalAmount ?? 0);

              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{gearName}</TableCell>
                  <TableCell>{customerName}</TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {formatDate(order.startDate)} → {formatDate(order.endDate)}
                  </TableCell>
                  <TableCell>৳{price}</TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLOR[order.status] || ""}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {nextStatus ? (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={statusMutation.isPending}
                        onClick={() =>
                          statusMutation.mutate({ id: order.id, status: nextStatus })
                        }
                      >
                        {ACTION_LABEL[order.status]}
                      </Button>
                    ) : (
                      <span className="text-xs text-slate-400">
                        {order.status === "CONFIRMED"
                          ? "Awaiting customer payment"
                          : "—"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {orders.length === 0 && (
          <p className="p-6 text-center text-slate-500">No orders yet.</p>
        )}
      </div>
    </div>
  );
}