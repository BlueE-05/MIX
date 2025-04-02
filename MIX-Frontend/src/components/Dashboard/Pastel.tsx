export default function Pastel() {
  return (

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          
        <link rel="stylesheet" href='globals.css'/>
        <h1>PIE CHART</h1>   

        <figure className="charts">
          <div className="pie donut"></div>
          <figcaption className="legends">
            <span>En curso</span> 
            <span>Cancelado</span> 
            <span>Aprobado</span> 
          </figcaption>
        </figure>
        
      </main>
      
  
  );
}