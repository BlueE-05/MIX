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
            <Link href="/" className="flex items-center">
              <span className="mr-2">🏠</span>
              <span>Home</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Link href="/sales" className="flex items-center">
              <span className="mr-2">💰</span>
              <span>Sales</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Link href="/reports" className="flex items-center">
              <span className="mr-2">📊</span>
              <span>Reports</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Link href="/calendar" className="flex items-center">
              <span className="mr-2">📅</span>
              <span>Calendar</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Link href="/contacts" className="flex items-center">
              <span className="mr-2">👥</span>
              <span>Contacts</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Link href="/products" className="flex items-center">
              <span className="mr-2">📦</span>
              <span>Products</span>
            </Link>
          </li>
        </ul>

        {/* Línea espaciadora */}
        <hr className="my-4 border-gray-700" />

        <ul>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Link href="/account" className="flex items-center">
              <span className="mr-2">👤</span>
              <span>Account</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Link href="/help" className="flex items-center">
              <span className="mr-2">❓</span>
              <span>Help & Information</span>
            </Link>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700">
            <Link href="/settings" className="flex items-center">
              <span className="mr-2">⚙️</span>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
