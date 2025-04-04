import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0a192f] shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/">
        <Image src="/mixMv1.svg" alt="Logo" width={55} height={5} className="cursor-pointer" />
      </Link>
      <ul className="flex space-x-6 text-white">
        <li className="hover:text-green-400 "><Link href="/">Home</Link></li>
        <li className="hover:text-green-400 "><Link href="/aboutus">About Us</Link></li>
        <li className="hover:text-green-400 "><Link href="/login">Log In</Link></li>
        <li className="hover:text-green-400 "><Link href="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
}
