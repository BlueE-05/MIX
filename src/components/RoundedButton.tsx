import { LucideIcon } from "lucide-react";

interface RoundedButtonProps {
    color: string;
    text: string;
    Icon?: LucideIcon;
}

const RoundedButton = ({ color, text, Icon }: RoundedButtonProps) => {
    return (
        <button className="flex justify-center items-center p-5 rounded-xl text-white transition-all duration-200 hover:brightness-90" style={{ backgroundColor: color }}>
            {Icon && <Icon className="mr-2" size={20} />}
            {text}
        </button>
    );
};
export default RoundedButton;