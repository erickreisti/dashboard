import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Eye, MoreHorizontal, Package } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  email: string;
  status: string;
  total: number;
  createdAt: Date;
  items?: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
    };
  }>;
}

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "shipped":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      completed: "Concluído",
      pending: "Pendente",
      shipped: "Enviado",
      cancelled: "Cancelado",
    };
    return statusMap[status] || status;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="text-sm font-semibold text-gray-900 py-4">
              Pedido
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-900 py-4">
              Cliente
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-900 py-4">
              Status
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-900 py-4 text-right">
              Total
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-900 py-4">
              Data
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-900 py-4 text-right">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group"
            >
              <TableCell className="py-4">
                <div>
                  <p className="font-medium text-gray-900">
                    #{order.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.items?.length || 0} item
                    {order.items?.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div>
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <Badge
                  variant={getStatusVariant(order.status)}
                  className="capitalize"
                >
                  {getStatusText(order.status)}
                </Badge>
              </TableCell>
              <TableCell className="py-4 text-right">
                <p className="font-semibold text-gray-900">
                  {formatCurrency(order.total)}
                </p>
              </TableCell>
              <TableCell className="py-4">
                <p className="text-gray-600">{formatDate(order.createdAt)}</p>
              </TableCell>
              <TableCell className="py-4 text-right">
                <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Package className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-500 text-lg font-medium">
            Nenhum pedido encontrado
          </p>
          <p className="text-gray-400 mt-1">
            Os pedidos aparecerão aqui quando forem criados.
          </p>
        </div>
      )}
    </div>
  );
}
