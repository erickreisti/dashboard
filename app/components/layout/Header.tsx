"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  ShoppingBag,
  Package,
  Users,
  Menu,
  X,
  Bell,
  Search,
  User,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 transition-all duration-300 sticky-header ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container-responsive">
        <div className="flex justify-between items-center h-responsive">
          {/* Logo */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-transform hover:scale-105">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="hidden xs:block">
                <h1 className="text-responsive-sm font-bold text-gray-900">
                  E-Commerce Pro
                </h1>
                <p className="text-responsive-xs text-gray-500 hidden sm:block">
                  Painel Administrativo
                </p>
              </div>
            </div>

            {/* Navegação Desktop - VISÍVEL EM 768px+ (md) */}
            <nav className="hidden md:flex space-x-responsive">
              <a
                href="/dashboard"
                className="flex items-center space-x-2 text-blue-600 font-medium px-3 py-2 rounded-lg bg-blue-50 transition-all duration-200 hover:bg-blue-100 hover:scale-105 header-focus"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </a>
              <a
                href="/products"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 header-focus"
              >
                <Package className="h-4 w-4" />
                <span>Produtos</span>
              </a>
              <a
                href="/orders"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 header-focus"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Pedidos</span>
              </a>
            </nav>
          </div>

          {/* Lado Direito */}
          <div className="flex items-center space-x-responsive">
            {/* Search - apenas desktop */}
            <div className="hidden lg:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="input-responsive pl-10 w-48 xl:w-64 transition-all duration-200 focus:w-56 xl:focus:w-72"
              />
            </div>

            {/* Notifications - VISÍVEL EM 768px+ (md) */}
            <button className="hidden md:flex header-touch relative p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 header-focus">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {/* User Menu - VISÍVEL EM 768px+ (md) */}
            <div className="hidden md:flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 header-touch header-focus">
              <div className="bg-gray-200 p-1 rounded-full transition-transform hover:scale-110">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-responsive-xs font-medium text-gray-900">
                  Admin
                </p>
              </div>
            </div>

            {/* Mobile Menu Button - VISÍVEL APENAS ABAIXO DE 768px */}
            <button
              className="md:hidden header-touch p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 header-focus"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - APENAS ABAIXO DE 768px */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white mobile-only menu-slide-down"
          >
            <div className="container-responsive py-4">
              <nav className="space-y-3">
                <a
                  href="/dashboard"
                  className="flex items-center space-x-3 px-3 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium transition-all duration-200 hover:bg-blue-100 header-touch"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </a>
                <a
                  href="/products"
                  className="flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-blue-600 rounded-lg transition-all duration-200 hover:bg-gray-50 header-touch"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-4 w-4" />
                  <span>Produtos</span>
                </a>
                <a
                  href="/orders"
                  className="flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-blue-600 rounded-lg transition-all duration-200 hover:bg-gray-50 header-touch"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Pedidos</span>
                </a>
              </nav>

              {/* Search Mobile */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="input-responsive pl-10 w-full header-touch"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
