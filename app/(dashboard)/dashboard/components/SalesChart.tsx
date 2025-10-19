"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface SalesData {
  name: string;
  total: number;
}

interface SalesChartProps {
  data: SalesData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-900">{`${label}`}</p>
        <p className="text-blue-600 font-semibold">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function SalesChart({ data }: SalesChartProps) {
  // Cores para as barras (gradiente de azul)
  const getColor = (value: number, maxValue: number) => {
    const intensity = value / maxValue;
    if (intensity > 0.7) return "#2563eb"; // Azul escuro
    if (intensity > 0.4) return "#3b82f6"; // Azul médio
    return "#60a5fa"; // Azul claro
  };

  const maxValue = Math.max(...data.map((item) => item.total));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f3f4f6"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            width={60}
            tickFormatter={(value) =>
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 0,
              }).format(value)
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={32}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getColor(entry.total, maxValue)}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legendas */}
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
          <span className="text-xs text-gray-600">Baixo</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
          <span className="text-xs text-gray-600">Médio</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <span className="text-xs text-gray-600">Alto</span>
        </div>
      </div>
    </div>
  );
}
