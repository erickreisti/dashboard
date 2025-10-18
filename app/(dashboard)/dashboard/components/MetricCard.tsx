"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          {icon && <div className="text-blue-500">{icon}</div>}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
