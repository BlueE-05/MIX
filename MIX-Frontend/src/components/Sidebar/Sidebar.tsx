'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { House, DollarSign, Boxes, UserRound, Columns3, ChartNoAxesCombined, Users, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Función para determinar el color del texto
  const getTextColor = (path: string) => {
    return pathname === path ? 'text-green-400' : 'text-gray-300';
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-58'}`}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-gray-900 p-2 relative">
        {!isCollapsed ? (
          <Image 
            src="/mixlogo.svg" 
            alt="Logo" 
            width={80}
            height={60}
            className="h-auto"
          />
        ) : (
          <Image 
            src="/mixMv1.svg" 
            alt="Logo Icon" 
            width={40}
            height={40}
            className="h-10"
          />
        )}
        <button
          onClick={toggleSidebar}
          className="absolute right-2 p-1 rounded-md hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menú */}
      <nav className="flex-grow mt-5">
        <ul>
          <Link 
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-green-400 transition-colors ${getTextColor('/crm/dashboard')} ${isCollapsed ? 'justify-center' : ''}`} 
            href="/crm/dashboard"
          >
            <House className={isCollapsed ? '' : "mr-2"} />
            {!isCollapsed && <span>Home</span>}
          </Link>
          <Link 
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-green-400 transition-colors ${getTextColor('/crm/sales')} ${isCollapsed ? 'justify-center' : ''}`} 
            href="/crm/sales"
          >
            <DollarSign className={isCollapsed ? '' : "mr-2"} />
            {!isCollapsed && <span>Sales</span>}
          </Link>
          <Link 
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-green-400 transition-colors ${getTextColor('/crm/reports')} ${isCollapsed ? 'justify-center' : ''}`} 
            href="/crm/reports"
          >
            <ChartNoAxesCombined className={isCollapsed ? '' : "mr-2"} />
            {!isCollapsed && <span>Reports</span>}
          </Link>
          <Link 
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-green-400 transition-colors ${getTextColor('/crm/kanban')} ${isCollapsed ? 'justify-center' : ''}`} 
            href="/crm/kanban"
          >
            <Columns3 className={isCollapsed ? '' : "mr-2"} />
            {!isCollapsed && <span>Kanban</span>}
          </Link>
          <Link 
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-green-400 transition-colors ${getTextColor('/crm/contacts')} ${isCollapsed ? 'justify-center' : ''}`} 
            href="/crm/contacts"
          >
            <Users className={isCollapsed ? '' : "mr-2"} />
            {!isCollapsed && <span>Contacts</span>}
          </Link>
          <Link 
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-green-400 transition-colors ${getTextColor('/crm/products')} ${isCollapsed ? 'justify-center' : ''}`} 
            href="/crm/products"
          >
            <Boxes className={isCollapsed ? '' : "mr-2"} />
            {!isCollapsed && <span>Products</span>}
          </Link>
        </ul>

        {/* Línea espaciadora */}
        <hr className="my-4 border-gray-700" />

        <ul>
          <Link 
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-green-400 transition-colors ${getTextColor('/crm/account')} ${isCollapsed ? 'justify-center' : ''}`} 
            href="/crm/account"
          >
            <UserRound className={isCollapsed ? '' : "mr-2"} />
            {!isCollapsed && <span>Account</span>}
          </Link>
          <Link 
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-green-400 transition-colors ${getTextColor('/crm/information')} ${isCollapsed ? 'justify-center' : ''}`} 
            href="/crm/information"
          >
            <HelpCircle className={isCollapsed ? '' : "mr-2"} />
            {!isCollapsed && <span>Help & Information</span>}
          </Link>
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed ? (
        <div className="flex items-center justify-between px-4">
          <Image 
            src="/raydevlogov1.svg" 
            alt="Logo" 
            width={85}
            height={60}
            className="h-auto"
          />
          <span className="text-sm text-gray-400">2025</span>
        </div>
      ) : (
        <div className="flex justify-center pb-4">
          <Image 
            src="/raydevRv2.svg" 
            alt="Logo Icon" 
            width={40}
            height={40}
            className="h-10"
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;