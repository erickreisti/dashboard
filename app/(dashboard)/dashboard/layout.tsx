export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header interno opcional */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold text-gray-800">📊 Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto py-6">{children}</div>
    </div>
  );
}
