import Link from "next/link";
import { House, DollarSign, Boxes, UserRound, Columns3, ChartNoAxesCombined, Users, HelpCircle,   } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <img src="./public/logo.png" alt="Logo" className="h-10" />
      </div>

      {/* Menú */}
      <nav className="flex-grow mt-5">
        <ul>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <House className="mr-2"/>
            <Link href="/dashboard">
              <span className="text-white no-underline">Home</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <DollarSign className="mr-2"/>
            <span>Sales</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <ChartNoAxesCombined className="mr-2"/>
            <span>Reports</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Columns3 className="mr-2"/> 
            <span>Kanban</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Users className="mr-2"/>
            <Link href="/contacts">
              <span>Contacts</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Boxes className="mr-2"/>
            <Link href="/products">
              <span>Products</span>
            </Link>
          </li>
        </ul>

        {/* Línea espaciadora */}
        <hr className="my-4 border-gray-700" />

        <ul>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <UserRound className="mr-2"/>
            <span>Account</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <HelpCircle className="mr-2"/>
            <span>Help & Information</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;