'use client';
import Link from "next/link";
import { useState } from "react";
import { House, DollarSign, Boxes, UserRound, Columns3, ChartNoAxesCombined, Users, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSideBar = () => {setIsCollapsed(!isCollapsed)};   // Funcion para colapso del Sidebar

  return (
    <div className={`flex flex-col h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-gray-900 p-2">
        {!isCollapsed && <img src="/mixlogo.svg" alt="Logo" className="h-20"/>} {/*Visualizacion del Logo normal*/}
        {isCollapsed && <img src="/mixMv1.svg" alt="Logo_Icon" className="h-10"/>} {/*Visualizacion del Logo icono al colapsar*/}
        <button
        onClick={toggleSideBar}
        className="absolute right-2 p-1 rounded-md hover:bg-gray-700"
        >
          {isCollapsed ? '>' : '<'}
        </button>
      </div>

      {/* Menú */}
      <nav className="flex-grow mt-5">
        <ul>
          <Link className={`flex items-center p-4 hover:text-green-400   ${isCollapsed ? 'justify-center' : ''}`} href="/crm/dashboard">
            <House className={isCollapsed ? '' : "mr-2"} />
            { !isCollapsed && <span className="no-underline">Home</span>}
          </Link>
          <Link className={`flex items-center p-4 hover:text-green-400   ${isCollapsed ? 'justify-center' : ''}`} href="/crm/sales">
            <DollarSign className={isCollapsed ? '' : "mr-2"} />
            { !isCollapsed && <span>Sales</span>}
          </Link>
          <Link className={`flex items-center p-4 hover:text-green-400   ${isCollapsed ? 'justify-center' : ''}`} href="/crm/reports">
            <ChartNoAxesCombined className={isCollapsed ? '' : "mr-2"} />
            { !isCollapsed && <span>Reports</span>}
          </Link>
          <Link className={`flex items-center p-4 hover:text-green-400   ${isCollapsed ? 'justify-center' : ''}`} href="/crm/kanban">
            <Columns3 className={isCollapsed ? '' : "mr-2"} />
            { !isCollapsed && <span>Kanban</span>}
          </Link>
          <Link className={`flex items-center p-4 hover:text-green-400   ${isCollapsed ? 'justify-center' : ''}`} href="/crm/contacts">
            <Users className={isCollapsed ? '' : "mr-2"} />
            { !isCollapsed && <span>Contacts</span>}
          </Link>
          <Link className={`flex items-center p-4 hover:text-green-400   ${isCollapsed ? 'justify-center' : ''}`} href="/crm/products">
            <Boxes className={isCollapsed ? '' : "mr-2"} />
            { !isCollapsed && <span>Products</span>}
          </Link>
        </ul>

        {/* Línea espaciadora */}
        <hr className="my-4 border-gray-700" />

        <ul>
          <Link className={`flex items-center p-4 hover:text-green-400   ${isCollapsed ? 'justify-center' : ''}`} href="/crm/account">
            <UserRound className="mr-2" />
            { !isCollapsed && <span>Account</span>}
          </Link>
          <Link className={`flex items-center p-4 hover:text-green-400   ${isCollapsed ? 'justify-center' : ''}`} href="/crm/information">
            <HelpCircle className="mr-2" />
            { !isCollapsed && <span>Help & Information</span>}
          </Link>
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="flex items-center justify-between px-4">
          <img src="/raydevlogov1.svg" alt="Logo" className="h-20" />
          <span className="text-sm text-gray-400  ">2025</span>
        </div>
      )}
      {isCollapsed && (<img src="/raydevRv2.svg" alt="Logo_Icon" className="h-10"/>)}
    </div>
  );
};

export default Sidebar;
