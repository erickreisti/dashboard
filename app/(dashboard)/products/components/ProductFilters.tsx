"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface ProductFiltersProps {
  categories: string[];
  searchParams: {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
  };
}

export function ProductFilters({
  categories,
  searchParams,
}: ProductFiltersProps) {
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.search || "");
  const [inStock, setInStock] = useState(searchParams.inStock || "");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, inStock, minPrice, maxPrice]);

  const updateFilters = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (inStock) params.set("inStock", inStock);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch("");
    setInStock("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/products");
  };

  const hasActiveFilters = search || inStock || minPrice || maxPrice;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
          {/* Search */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar produtos
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou descrição..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stock Status */}
          <div className="w-full lg:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status estoque
            </label>
            <Select value={inStock} onValueChange={setInStock}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Em estoque</SelectItem>
                <SelectItem value="false">Sem estoque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="flex gap-2 w-full lg:w-auto">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço mín.
              </label>
              <Input
                type="number"
                placeholder="R$ 0,00"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço máx.
              </label>
              <Input
                type="number"
                placeholder="R$ 0,00"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="whitespace-nowrap"
            >
              <X className="h-4 w-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
