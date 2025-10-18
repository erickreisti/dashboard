// Importa os componentes de tabela do shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

// Define o tipo de um pedido
interface Order {
  id: string; // ID do pedido
  status: string; // Status (ex: 'pending', 'shipped')
  total: number; // Valor total do pedido
  createdAt: Date; // Data de criação
}

// Define o tipo da prop que o componente receberá
interface OrdersTableProps {
  orders: Order[]; // Array de pedidos
}

// Componente que recebe os pedidos via props
export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {/* Título da tabela */}
      <h2 className="text-lg font-semibold mb-2">Pedidos Recentes</h2>
      {/* Tabela */}
      <Table>
        {/* Cabeçalho da tabela */}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        {/* Corpo da tabela */}
        <TableBody>
          {/* Mapeia cada pedido e renderiza uma linha */}
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>R$ {order.total.toFixed(2)}</TableCell>
              {/* Formata a data para DD/MM/AAAA */}
              <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
