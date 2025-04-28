import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface RoundedButtonProps {
    color: string;
    text: string;
    Icon?: LucideIcon;
    link?: string;
    onChange?: () => void; // Agregado el prop onChange
    disabled?: boolean;
}

const RoundedButton = ({ color, text, Icon, link, onChange, disabled }: RoundedButtonProps) => {
    const handleClick = () => {
        if (onChange) {
            onChange(); // Ejecutamos la función onChange si se proporciona
        }
    };

    return (
        <Link href={link || "#"} passHref>
            <button
                disabled={disabled}
                className="flex justify-center items-center p-5 rounded-xl text-white transition-all duration-200 hover:brightness-90"
                style={{ backgroundColor: color }}
                onClick={handleClick} // Añadimos el onClick para manejar el onChange
            >
                {Icon && <Icon className="mr-2" size={20} />}
                {text}
            </button>
        </Link>
    );
};

export default RoundedButton;