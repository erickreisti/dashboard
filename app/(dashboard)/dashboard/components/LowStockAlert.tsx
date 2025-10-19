import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  stock: number;
}

interface LowStockAlertProps {
  products: Product[];
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  if (products.length === 0) {
    return (
      <Card className="border-green-200 bg-green-50/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center space-y-0 pb-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-800">
            <div className="bg-green-100 p-1.5 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-green-600" />
            </div>
            Estoque em Dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700">
            Todos os produtos possuem estoque adequado.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200 bg-orange-50/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-800">
          <div className="bg-orange-100 p-1.5 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </div>
          Atenção ao Estoque
        </CardTitle>
        <button className="text-orange-600 hover:text-orange-700 transition-colors">
          <ArrowRight className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between group"
            >
              <div>
                <span className="text-sm font-medium text-orange-900 group-hover:text-orange-700 transition-colors">
                  {product.name}
                </span>
                <p className="text-xs text-orange-700">Estoque crítico</p>
              </div>
              <span className="text-sm font-bold text-orange-800 bg-orange-100 px-2 py-1 rounded-full min-w-12 text-center">
                {product.stock} un
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
