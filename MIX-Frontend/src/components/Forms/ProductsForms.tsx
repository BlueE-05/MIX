'use client'
<<<<<<< HEAD
import React, { useState, ChangeEvent, useCallback } from "react";
import Input from "@/components/Forms/Input";
import NumberInput from "@/components/Forms/NumberInput";
import RoundedButton from "@/components/Buttons/RoundedButton";
import { Check } from "lucide-react";
import { ProductSend } from '@/types/ProductTypes';
import { createProduct } from "@/hooks/product/createProduct";

interface FormularioProps {
  onClose: () => void;
}

const MAX_LENGTHS = {
  refnum: 50,
  name: 50,
  desciption: 255,
  productsheet: 255,
}

export default function Formulario({ onClose }: FormularioProps) {
  const [productData, setProductData] = useState<ProductSend>({
    RefNum: "",
    Name: "",
    Description: "",
    UnitaryPrice: 0,
    Commission: 0,
    ProductSheetURL: "",
=======
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@/components/Forms/Input";
import NumberInput from "@/components/Forms/NumberInput"; // New component for numbers
import RoundedButton from "@/components/Buttons/RoundedButton";
import { Check } from "lucide-react";

export interface ProductData {
  refNum: string;
  name: string;
  description: string;
  unitaryPrice: number;
  commission: number;
  productSheet: string;
}

interface FormularioProps {
  onClose: () => void;
  onSubmit: (data: ProductData) => void;
}

export default function Formulario({ onClose, onSubmit }: FormularioProps) {
  const [productData, setProductData] = useState<ProductData>({
    refNum: "",
    name: "",
    description: "",
    unitaryPrice: 0,
    commission: 0,
    productSheet: "",
>>>>>>> origin/pruebanewmerge_sales_report
  });

  const handleStringChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleNumberChange = (name: string, value: number): void => {
    setProductData({ ...productData, [name]: value });
  };

<<<<<<< HEAD
  const handleSubmit = useCallback(async (data: ProductSend) => {
    try {
      await createProduct(data);
      onClose();
    } catch (error) {
      console.error("Error creating:", error);
    }
  }, [onClose]);

  const isFormValid = () => {
    return (
      productData.RefNum !== "" &&
      productData.Name !== "" &&
      productData.UnitaryPrice > 0 &&
      productData.Commission > 0 &&
      productData.Commission <= 100
=======
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onSubmit(productData);
  };

  const isFormValid = () => {
    return (
      productData.refNum !== "" &&
      productData.name !== "" &&
      productData.unitaryPrice > 0 &&
      productData.commission > 0
>>>>>>> origin/pruebanewmerge_sales_report
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="font-bold text-3xl">Product Form</h1>
<<<<<<< HEAD
          <button
=======
          <button 
>>>>>>> origin/pruebanewmerge_sales_report
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form>
          <div className="flex gap-10 w-full">
            <div className="flex-1">
<<<<<<< HEAD
              <Input
                label="Reference Number"
                name="RefNum"
                type="text"
                value={productData.RefNum}
                onChange={handleStringChange}
                required
                max_lenght={MAX_LENGTHS.refnum}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Product Name"
                name="Name"
                type="text"
                value={productData.Name}
                onChange={handleStringChange}
                required
                max_lenght={MAX_LENGTHS.name}
=======
              <Input 
                label="Reference Number" 
                name="refNum" 
                type="text" 
                value={productData.refNum} 
                onChange={handleStringChange} 
                required 
              />
            </div>
            <div className="flex-1">
              <Input 
                label="Product Name" 
                name="name" 
                type="text" 
                value={productData.name} 
                onChange={handleStringChange} 
                required 
>>>>>>> origin/pruebanewmerge_sales_report
              />
            </div>
          </div>

          <div className="mt-4">
<<<<<<< HEAD
            <Input
              label="Description"
              name="Description"
              type="text"
              value={productData.Description}
              onChange={handleStringChange}
              max_lenght={MAX_LENGTHS.desciption}
=======
            <Input 
              label="Description" 
              name="description" 
              type="text" 
              value={productData.description} 
              onChange={handleStringChange} 
>>>>>>> origin/pruebanewmerge_sales_report
            />
          </div>

          <div className="flex gap-10 w-full mt-4">
            <div className="flex-1">
              <NumberInput
<<<<<<< HEAD
                label="Unitary Price"
                name="UnitaryPrice"
                min={0}
                step={0.01}
                value={productData.UnitaryPrice}
                onChange={(value) => handleNumberChange('UnitaryPrice', value)}
=======
                label="Unitary Price" 
                name="unitaryPrice"
                min={0}
                step={0.01}
                value={productData.unitaryPrice}
                onChange={(value) => handleNumberChange('unitaryPrice', value)}
>>>>>>> origin/pruebanewmerge_sales_report
                required
              />
            </div>
            <div className="flex-1">
              <NumberInput
<<<<<<< HEAD
                label="Commission (%)"
                name="Commission"
                min={0}
                max={100}
                step={0.01}
                value={productData.Commission}
                onChange={(value) => handleNumberChange('Commission', value)}
=======
                label="Commission (%)" 
                name="commission"
                min={0}
                max={100}
                value={productData.commission}
                onChange={(value) => handleNumberChange('commission', value)}
>>>>>>> origin/pruebanewmerge_sales_report
                required
              />
            </div>
          </div>

          <div className="mt-4">
<<<<<<< HEAD
            <Input
              label="Product Sheet URL"
              name="ProductSheetURL"
              type="url"
              value={productData.ProductSheetURL}
              onChange={handleStringChange}
              max_lenght={MAX_LENGTHS.productsheet}
=======
            <Input 
              label="Product Sheet URL" 
              name="productSheet" 
              type="url" 
              value={productData.productSheet} 
              onChange={handleStringChange} 
>>>>>>> origin/pruebanewmerge_sales_report
            />
          </div>

          <div className="flex justify-end w-full mt-10 border-t border-gray-300 pt-4">
            <button type="submit" className="hidden" aria-hidden="true" />
<<<<<<< HEAD
            <div
              onClick={() => handleSubmit(productData)}
              className="cursor-pointer"
            >
              <RoundedButton
                color={isFormValid() ? "green" : "red"}
                text="Submit"
=======
            <div 
              onClick={handleSubmit}
              className="cursor-pointer"
            >
              <RoundedButton 
                color={isFormValid() ? "green" : "red"} 
                text="Submit" 
>>>>>>> origin/pruebanewmerge_sales_report
                Icon={Check}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}