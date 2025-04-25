'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { House, DollarSign, Boxes, UserRound, Columns3, ChartNoAxesCombined, Users, HelpCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from "next/image";
import Confetti from 'react-confetti';

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showTheSidebar, setshowTheSidebar] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'g') {
        setshowTheSidebar(true);
      }
      
      if (showTheSidebar && e.code === 'Space') {
        setshowTheSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyEvent);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyEvent);
    };
  }, [showTheSidebar]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const teamMembers = [
    { name: "Dana Torres", role: "Backend", social: "@dana", socialLink:"https://www.linkedin.com/in/dana-elizabeth-torres-estrada-b20b2b329" },
    { name: "Maximo Ramírez", role: "Frontend", social: "@maximo", socialLink:"https://www.linkedin.com/in/maximo-ramirez" },
    { name: "Fatima Castillo", role: "Backend", social: "@fatima", socialLink:"https://www.linkedin.com/in/fatimacastilloaguirre" },
    { name: "Daniel Sanchez", role: "Videogame", social: "@daniel", socialLink:"" },
    { name: "Sandino Ortiz", role: "Backend", social: "@sandino", socialLink:"https://www.linkedin.com/in/ernesto-sandino-ortiz-de-le%C3%B3n-91255227a/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" }
  ];

  const getTextColor = (path: string) => {
    return pathname === path ? 'text-green-400' : 'text-gray-300';
  };

  return (
    <>
      {showTheSidebar && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            style={{ position: 'fixed', zIndex: 9999 }}
          />

          <div 
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            onClick={() => setshowTheSidebar(false)}
          />

          <div 
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 10000 }}
          >
            <div className="relative bg-gray-800 rounded-lg p-6 max-w-md w-full border-2 border-green-400 shadow-lg mx-auto my-auto">
              <div className="flex justify-end mb-2">
                <button 
                  onClick={() => setshowTheSidebar(false)}
                  className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <X className="text-gray-300" size={20} />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-green-400 mb-3 text-center">Hi! 🎉</h2>
              <p className="text-gray-300 mb-5 text-center">
              We created this project with care and passion from the ground up, and we hope it helps you...
              This is us if you want us to work with you again ;3
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-gray-700/50 rounded p-3">
                    <p className="font-medium text-gray-100">{member.name}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{member.role}</span>
                      <a 
                        href={member.socialLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-400 hover:underline hover:text-green-300 transition-colors"
                      >
                        {member.social}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Press Space or click outside to close
              </p>
            </div>
          </div>
        </>
      )}

      <div className={`flex flex-col h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-58'}`}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-gray-800 p-2 relative">
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
              {!isCollapsed && <span>Training</span>}
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
    </>
  );
};

export default Sidebar;