'use client'

import CustomTable from '@/components/CustomTable';
import LabelOval from '@/components/LabelOval';
import PointsButton from '@/components/PointsButton';

const ProductPage = () => {
  const productHeaders = ["#", "Name of Product", "Ref. Number", "Unitary Price", "Billing Frecuency", "Product Type", "Product Sheet", ""];
  
  {/**Data random para rellenar la tabla **/}
  const productData = Array.from({ length: 25 }, (_, i) => [
    i + 1,
    `MIX CRM ${["Basic", "Pro", "Enterprise"][i % 3]}`,
    `CRM-${String(i + 1).padStart(3, "0")}`,
    [29.99, 49.99, 99.99][i % 3],
    ["Monthly", "Monthly", "Yearly"][i % 3],
    <LabelOval color={["green", "blue", "red"][i % 3]} data={["Inventory", "Subscription", "Service"][i % 3]} />,
    <a href={`/files/MIX_CRM_${["Basic", "Pro", "Enterprise"][i % 3]}.pdf`} className="text-blue-500 underline">View Sheet</a>,
    <PointsButton />,
  ]);

  return (
    <main className="min-h-screen p-6">
      <h1 className="font-bold text-3xl mb-5">Products List</h1>
      <CustomTable headers={productHeaders} data={productData} color="orange-500"/>
    </main>
  );
};

export default ProductPage;