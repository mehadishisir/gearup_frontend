"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProviderOrders, updateOrderStatus} from "@/services/ProviderService";

const NEXT_STATUS: Record<string, string> = {
  PLACED: "CONFIRMED",
  CONFIRMED: "PAID",
  PAID: "PICKED_UP",
  PICKED_UP: "RETURNED",
};

const ACTION_LABEL: Record<string, string> = {
  PLACED: "Confirm",
  CONFIRMED: "Mark Paid",
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
    onError: (err: Error) => toast.error(err.message),
  });

  if (isLoading) {
    return <div className="p-6 text-slate-500">Loading orders...</div>;
  }

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
            {data?.map((order) => {
              const nextStatus = NEXT_STATUS[order.status];
              return (
                <TableRow key={order.id}>
                  <TableCell>{order.gearItem?.name}</TableCell>
                  <TableCell>{order.customer?.name}</TableCell>
                  <TableCell>
                    {order.startDate} → {order.endDate}
                  </TableCell>
                  <TableCell>৳{order.totalPrice}</TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLOR[order.status]}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {nextStatus && (
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
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {data?.length === 0 && (
          <p className="p-6 text-center text-slate-500">No orders yet.</p>
        )}
      </div>
    </div>
  );
}