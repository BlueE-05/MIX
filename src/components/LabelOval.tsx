interface LabelProps {
  data: string;
  color: string;
}
const LabelOval = ({ data, color }: LabelProps) => {
    const bgcolor = `${color}33`;
    const txtcolor = `text-${color}-700`;
    
    return (
        <div className="rounded-full flex items-center justify-center px-4 py-2 w-24" style={{ backgroundColor: bgcolor }}>
            <p className="font-bold" style={{ color: color}}>{data}</p>
        </div>
    );
};

export default LabelOval;