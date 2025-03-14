import Link from "next/link";
import { House, DollarSign, Boxes, UserRound, Columns3, ChartNoAxesCombined, Users, HelpCircle, } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <img src="/mixlogo.svg" alt="Logo" className="h-20" />
      </div>

      {/* Menú */}
      <nav className="flex-grow mt-5">
        <ul>
          <Link className="flex items-center p-4 hover:bg-gray-700" href="/dashboard">
            <House className="mr-2" />
            <span className="text-white no-underline">Home</span>
          </Link>
          <Link className="flex items-center p-4 hover:bg-gray-700" href="/sales">
            <DollarSign className="mr-2" />
            <span>Sales</span>
          </Link>
          <Link className="flex items-center p-4 hover:bg-gray-700" href="/reports">
            <ChartNoAxesCombined className="mr-2" />
            <span>Reports</span>
          </Link>
          <Link className="flex items-center p-4 hover:bg-gray-700" href="/kanban">
            <Columns3 className="mr-2" />
            <span>Kanban</span>
          </Link>
          <Link className="flex items-center p-4 hover:bg-gray-700" href="/contacts">
            <Users className="mr-2" />
            <span>Contacts</span>
          </Link>
          <Link className="flex items-center p-4 hover:bg-gray-700" href="/products">
            <Boxes className="mr-2" />
            <span>Products</span>
          </Link>
        </ul>

        {/* Línea espaciadora */}
        <hr className="my-4 border-gray-700" />

        <ul>
          <Link className="flex items-center p-4 hover:bg-gray-700" href="/account">
            <UserRound className="mr-2" />
            <span>Account</span>
          </Link>
          <Link className="flex items-center p-4 hover:bg-gray-700" href="/information">
            <HelpCircle className="mr-2" />
            <span>Help & Information</span>
          </Link>
        </ul>
      </nav>

      {/* Footer */}
      <div className="flex items-center justify-between px-4">
        <img src="/raydevlogov1.svg" alt="Logo" className="h-20" />
        <span className="text-sm text-gray-400">2025</span>
      </div>
    </div>
  );
};

export default Sidebar;
