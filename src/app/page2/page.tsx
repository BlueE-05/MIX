import BoxClosed from "../components/Dashboard/BoxClosed";
import BoxComisiones from "../components/Dashboard/BoxComisiones";
import LinesChart from "../components/Dashboard/LinesChart";
import PieChart from "../components/Dashboard/PieChart";
import Sidebar from "../components/Sidebar";


const Page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold">Contenido Principal</h1>
        <p>Aca va todo lo demas uwu</p>
      </div>
              <div>
                  <BoxClosed/>
                  <BoxComisiones/>
      
              </div>
    </div>
  );
};

export default Page;