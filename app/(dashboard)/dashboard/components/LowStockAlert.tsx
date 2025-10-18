import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { AlertTriangle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  stock: number;
}

interface LowStockAlertProps {
  products: Product[];
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  if (products.length === 0) return null;

  return (
    <Card className="border-orange-200 bg-orange-50/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-800">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          Estoque Baixo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {products.map((product) => (
            <div key={product.id} className="flex justify-between items-center">
              <span className="text-sm text-orange-700">{product.name}</span>
              <span className="text-sm font-medium text-orange-800 bg-orange-100 px-2 py-1 rounded">
                {product.stock} unidades
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
