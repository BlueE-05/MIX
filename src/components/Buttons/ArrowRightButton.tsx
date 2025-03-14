import { ArrowRight } from "lucide-react";

const ArrowRightButton = () => {
  return (
    <div className="flex items-center justify-center">
      <button className="font-bold hover:bg-gray-300 p-3 rounded-md">
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ArrowRightButton;