import { BarChart, LineChart, Plus, CirclePlus } from "lucide-react";
import RoundedButton from '@/components/RoundedButton';


export default function Page() {
  return (
    <div className="flex gap-4 p-8">
      <RoundedButton color="#4CAF50" text="Bar Chart" Icon={BarChart} />
      <RoundedButton color="#2196F3" text="Line Chart" Icon={LineChart} />
      <RoundedButton color="#9F2B68" text="New Contact" Icon={Plus}/>
      <RoundedButton color="#9F2B68" text="New Contact" Icon={CirclePlus}/>
    </div>
  );
}
