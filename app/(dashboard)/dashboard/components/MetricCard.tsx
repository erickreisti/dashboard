"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

export function MetricCard({
  title,
  value,
  description,
  icon,
  trend = "neutral",
}: MetricCardProps) {
  const trendConfig = {
    up: { color: "text-green-600", icon: <TrendingUp className="h-4 w-4" /> },
    down: { color: "text-red-600", icon: <TrendingDown className="h-4 w-4" /> },
    neutral: { color: "text-gray-600", icon: null },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          <div className="text-gray-400">{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              {description && (
                <div className="flex items-center space-x-1 mt-1">
                  {trend !== "neutral" && trendConfig[trend].icon}
                  <p className={`text-xs ${trendConfig[trend].color}`}>
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
