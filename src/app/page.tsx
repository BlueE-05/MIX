import Image from "next/image";
import { Wind } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center space-x-2">
      <Wind className="w-6 h-6 text-blue-500" />
      <p>Hello!</p>
    </div>
  );
}