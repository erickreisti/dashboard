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
  Settings,
  LogOut,
  ChevronDown,
  Building2,
} from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-white/95 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? "shadow-lg shadow-black/5" : "shadow-sm"
      }`}
    >
      <div className="container-responsive">
        <div className="flex justify-between items-center h-16">
          {/* Logo e Navegação */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg shadow-md">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    BusinessSuite
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    Executive Dashboard
                  </p>
                </div>
              </Link>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden lg:flex space-x-1">
              <a
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200 group"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </a>

              <a
                href="/products"
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-xl hover:bg-green-50 transition-all duration-200 border border-transparent hover:border-green-200 group"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
                <Package className="h-4 w-4" />
                <span>Produtos</span>
              </a>

              <a
                href="/orders"
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium px-4 py-2 rounded-xl hover:bg-purple-50 transition-all duration-200 border border-transparent hover:border-purple-200 group"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></div>
                <ShoppingBag className="h-4 w-4" />
                <span>Pedidos</span>
              </a>

              <a
                href="/customers"
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium px-4 py-2 rounded-xl hover:bg-orange-50 transition-all duration-200 border border-transparent hover:border-orange-200 group"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-150 transition-transform"></div>
                <Users className="h-4 w-4" />
                <span>Clientes</span>
              </a>
            </nav>
          </div>

          {/* Lado Direito - Ações */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="hidden xl:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64 focus:w-72 placeholder-gray-500"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse border-2 border-white shadow-sm">
                  3
                </span>
              </button>
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-1 rounded-xl hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">Admin</p>
                    <p className="text-xs text-gray-500">Administrador</p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown User Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200/60 backdrop-blur-md py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        Admin User
                      </p>
                      <p className="text-sm text-gray-500">admin@empresa.com</p>
                    </div>

                    <div className="py-2">
                      <a
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Meu Perfil</span>
                      </a>

                      <a
                        href="/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Configurações</span>
                      </a>
                    </div>

                    <div className="border-t border-gray-100 pt-2">
                      <button className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors">
                        <LogOut className="h-4 w-4" />
                        <span>Sair do Sistema</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
            >
              <div className="container-responsive py-6">
                {/* Mobile Navigation */}
                <nav className="space-y-2 mb-6">
                  <a
                    href="/dashboard"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 bg-blue-50 rounded-xl font-medium border border-blue-200 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <BarChart3 className="h-5 w-5" />
                    <span>Dashboard</span>
                  </a>

                  <a
                    href="/products"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 rounded-xl font-medium border border-transparent hover:border-green-200 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Package className="h-5 w-5" />
                    <span>Produtos</span>
                  </a>

                  <a
                    href="/orders"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-xl font-medium border border-transparent hover:border-purple-200 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <ShoppingBag className="h-5 w-5" />
                    <span>Pedidos</span>
                  </a>

                  <a
                    href="/customers"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-xl font-medium border border-transparent hover:border-orange-200 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <Users className="h-5 w-5" />
                    <span>Clientes</span>
                  </a>
                </nav>

                {/* Mobile Search */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar no sistema..."
                      className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Mobile User Info */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-sm">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Admin User
                      </p>
                      <p className="text-xs text-gray-500">admin@empresa.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay para fechar menus */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
}
