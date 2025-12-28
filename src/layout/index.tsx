import { Footer } from "@/components/theme/footer";
import { Navbar } from "@/components/theme/navbar";
import { Outlet } from "react-router";
import '@/layout/styles/main.css'

export const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </div>
  );
}

