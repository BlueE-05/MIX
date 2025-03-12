import Link from "next/link";

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
            <span className="mr-2">🏠</span>
            <Link href="/dashboard">
              <span className="text-white no-underline">Home</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <span className="mr-2">💰</span>
            <span>Sales</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <span className="mr-2">📊</span>
            <span>Reports</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <span className="mr-2">📅</span>
            <span>Calendar</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <span className="mr-2">👥</span>
            <Link href="/contacts">
              <span>Contacts</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <span className="mr-2">📦</span>
            <Link href="/products">
              <span>Products</span>
            </Link>
          </li>
        </ul>

        {/* Línea espaciadora */}
        <hr className="my-4 border-gray-700" />

        <ul>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <span className="mr-2">👤</span>
            <span>Account</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <span className="mr-2">❓</span>
            <span>Help & Information</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <span className="mr-2">⚙️</span>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;