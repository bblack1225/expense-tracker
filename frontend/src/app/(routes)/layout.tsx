import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Navbar />
      </div>
      <div className="flex-grow py-1 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}
