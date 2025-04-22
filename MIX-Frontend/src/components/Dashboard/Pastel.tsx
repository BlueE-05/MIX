export default function PieChartComponent() {
  return (

    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

      <h1>PIE CHART</h1>

      <figure className="charts">
        <div className="pie donut"></div>
        <figcaption className="legends">
          <span>In progress</span>
          <span>Cancelled</span>
          <span>Approved</span>
        </figcaption>
      </figure>
      
    </main>
  );
}