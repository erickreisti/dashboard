// Importa os componentes de card do shadcn/ui
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
// Importa o componente de animação do Framer Motion
import { motion } from "framer-motion";

// Define o tipo das props que o componente receberá
interface MetricCardProps {
  title: string; // Título do card (ex: 'Vendas Totais')
  value: string; // Valor exibido (ex: 'R$ 1234.56')
  icon?: React.ReactNode; // Ícone opcional
}

// Componente que exibe uma métrica com animação
export function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    // Wrapper com animação de entrada
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Estado inicial: invisível e levemente abaixo
      animate={{ opacity: 1, y: 0 }} // Animação: visível e na posição normal
      transition={{ duration: 0.3 }} // Duração da animação
    >
      <Card>
        {/* Cabeçalho do card: título e ícone opcional */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </CardHeader>
        {/* Conteúdo do card: valor principal */}
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
