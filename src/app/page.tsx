import Sidebar from '@/components/Sidebar';

const Page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold">Contenido Principal</h1>
        <p>Aca va todo lo demas :v</p>
      </div>
    </div>
  );
};

export default Page;