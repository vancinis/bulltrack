import Header from './components/Header';

export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content (includes sidebar in page) */}
      <main className="flex">
        {children}
      </main>
    </div>
  );
}
