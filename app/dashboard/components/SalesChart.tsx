// Importa os componentes do recharts para criar gráficos
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define o tipo de dado esperado por cada item do gráfico
interface SalesData {
  name: string; // Nome do mês (ex: 'Jan')
  total: number; // Valor total de vendas
}

// Define o tipo da prop que o componente receberá
interface SalesChartProps {
  data: SalesData[]; // Array de dados de vendas
}

// Componente que recebe os dados via props
export function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {/* Título do gráfico */}
      <h2 className="text-lg font-semibold">Vendas por Mês</h2>
      {/* Gráfico responsivo */}
      <ResponsiveContainer width="100%" height={300}>
        {/* Gráfico de barras */}
        <BarChart data={data}>
          {/* Grade de fundo */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* Eixo X: nome do mês */}
          <XAxis dataKey="name" />
          {/* Eixo Y: valor total */}
          <YAxis />
          {/* Tooltip que mostra os valores ao passar o mouse */}
          <Tooltip />
          {/* Barra com base no campo `total` */}
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
