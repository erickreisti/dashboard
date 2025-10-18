import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: Date;
}

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/60 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Pedidos Recentes
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="text-gray-600 font-medium">ID</TableHead>
            <TableHead className="text-gray-600 font-medium">Status</TableHead>
            <TableHead className="text-gray-600 font-medium">Total</TableHead>
            <TableHead className="text-gray-600 font-medium">Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="border-b border-gray-100 hover:bg-gray-50/50"
            >
              <TableCell className="font-mono text-sm text-gray-600">
                {order.id.slice(0, 8)}...
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="font-medium text-gray-800">
                R$ {order.total.toFixed(2)}
              </TableCell>
              <TableCell className="text-gray-600">
                {order.createdAt.toLocaleDateString("pt-BR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
