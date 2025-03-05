interface LabelProps {
  data: string;
  color: string;
}
const LabelOval = ({ data, color }: LabelProps) => {
    const bgcolor = `bg-${color}-100`;
    const txtcolor = `text-${color}-700`;
    
    return (
        <div className={`${bgcolor} rounded-full flex items-center justify-center px-4 py-2 w-24`}>
            <p className={`${txtcolor} font-bold`}>{data}</p>
        </div>
    );
};

export default LabelOval;