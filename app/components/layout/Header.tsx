// components/Header.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, BarChart3, ShoppingBag, Package } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              E-Commerce Dashboard
            </h1>
          </motion.div>

          {/* Menu Desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center space-x-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center space-x-2"
                >
                  <Package className="h-4 w-4" />
                  <span>Produtos</span>
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center space-x-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Pedidos</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Menu Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="block py-2 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="block py-2 px-4 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  Pedidos
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
