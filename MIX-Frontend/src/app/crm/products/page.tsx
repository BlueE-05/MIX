'use client'

import { CirclePlus } from "lucide-react";

import CustomTable from '@/components/Tables/CustomTable';
import LabelOval from '@/components/Buttons/LabelOval';
import PointsButton from '@/components/Buttons/PointsButton';
import RoundedButton from '@/components/Buttons/RoundedButton';

const ProductPage = () => {
  const productHeaders = ["#", "Name of Product", "Ref. Number", "Unitary Price", "Billing Frecuency", "Product Type", "Product Sheet", ""];

  {/**Data random para rellenar la tabla **/}
  const productData = Array.from({ length: 25 }, (_, i) => [
    i + 1,
    `MIX CRM ${["Basic", "Pro", "Enterprise"][i % 3]}`,
    `CRM-${String(i + 1).padStart(3, "0")}`,
    [29.99, 49.99, 99.99][i % 3],
    ["Monthly", "Monthly", "Yearly"][i % 3],
    <LabelOval key={`label-${i}`} color={["#5F8575", "blue", "red"][i % 3]} data={["Inventory", "Subscription", "Service"][i % 3]} />,
    <a key={`link-${i}`} href={`/files/MIX_CRM_${["Basic", "Pro", "Enterprise"][i % 3]}.pdf`} className="text-blue-500 underline">View Sheet</a>,
    <PointsButton key={`points-${i}`} />,
  ]);

  return (
    <main className="min-h-screen p-6">
      <h1 className="font-bold text-3xl mb-5">Products List</h1>
      <CustomTable headers={productHeaders} data={productData} color="orange"/>

      <div className="fixed bottom-6 right-6">
        <RoundedButton color="orange" text="New Product" Icon={CirclePlus}/>
      </div>

    </main>
  );
};

export default ProductPage;