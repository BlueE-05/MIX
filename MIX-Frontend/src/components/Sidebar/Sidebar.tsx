'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation'; 
import { House, DollarSign, Boxes, UserRound, Columns3, ChartNoAxesCombined, Users, HelpCircle } from 'lucide-react';
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname(); // Obtenemos la ruta actual

  // Función para determinar el color del texto
  const getTextColor = () => {return pathname === '/products' ? 'text-orange-500' : 'text-green-500';};

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-gray-900">
      <Image 
          src="/mixlogo.svg" 
          alt="Logo" 
          className="h-20" 
          width={80} // Specify the width and height for optimization
          height={80} 
        />
      </div>

      {/* Menú */}
      <nav className="flex-grow mt-5">
        <ul>
          <Link className={`flex items-center p-4 hover:bg-gray-700 ${getTextColor()}`} href="/crm/dashboard">
            <House className="mr-2" />
            <span className="no-underline">Home</span>
          </Link>
          <Link className={`flex items-center p-4 hover:bg-gray-700 ${getTextColor()}`} href="/crm/sales">
            <DollarSign className="mr-2" />
            <span>Sales</span>
          </Link>
          <Link className={`flex items-center p-4 hover:bg-gray-700 ${getTextColor()}`} href="/crm/reports">
            <ChartNoAxesCombined className="mr-2" />
            <span>Reports</span>
          </Link>
          <Link className={`flex items-center p-4 hover:bg-gray-700 ${getTextColor()}`} href="/crm/kanban">
            <Columns3 className="mr-2" />
            <span>Kanban</span>
          </Link>
          <Link className={`flex items-center p-4 hover:bg-gray-700 ${getTextColor()}`} href="/crm/contacts">
            <Users className="mr-2" />
            <span>Contacts</span>
          </Link>
          <Link className={`flex items-center p-4 hover:bg-gray-700 ${getTextColor()}`} href="/crm/products">
            <Boxes className="mr-2" />
            <span>Products</span>
          </Link>
        </ul>

        {/* Línea espaciadora */}
        <hr className="my-4 border-gray-700" />

        <ul>
          <Link className={`flex items-center p-4 hover:bg-gray-700 ${getTextColor()}`} href="/crm/account">
            <UserRound className="mr-2" />
            <span>Account</span>
          </Link>
          <Link className={`flex items-center p-4 hover:bg-gray-700 ${getTextColor()}`} href="/crm/information">
            <HelpCircle className="mr-2" />
            <span>Help & Information</span>
          </Link>
        </ul>
      </nav>

      {/* Footer */}
      <div className="flex items-center justify-between px-4">
      <Image 
          src="/raydevlogov1.svg" 
          alt="Logo" 
          className="h-20" 
          width={80} // Specify the width and height for optimization
          height={80} 
        />
        <span className="text-sm text-gray-400">2025</span>
      </div>
    </div>
  );
};

export default Sidebar;
