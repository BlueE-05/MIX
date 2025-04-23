'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@/components/Forms/Input";
import NumberInput from "@/components/Forms/NumberInput"; // New component for numbers
import RoundedButton from "@/components/Buttons/RoundedButton";
import { Check } from "lucide-react";
import { ProductSent } from '@/types/Product';

interface FormularioProps {
  onClose: () => void;
  onSubmit: (data: ProductSent) => void;
}

export default function Formulario({ onClose, onSubmit }: FormularioProps) {
  const [productData, setProductData] = useState<ProductSent>({
    refNum: "",
    name: "",
    description: "",
    unitaryPrice: 0,
    commission: 0,
    productSheetURL: "",
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
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="font-bold text-3xl">Product Form</h1>
          <button 
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
              />
            </div>
          </div>

          <div className="mt-4">
            <Input 
              label="Description" 
              name="description" 
              type="text" 
              value={productData.description} 
              onChange={handleStringChange} 
            />
          </div>

          <div className="flex gap-10 w-full mt-4">
            <div className="flex-1">
              <NumberInput
                label="Unitary Price" 
                name="unitaryPrice"
                min={0}
                step={0.01}
                value={productData.unitaryPrice}
                onChange={(value) => handleNumberChange('unitaryPrice', value)}
                required
              />
            </div>
            <div className="flex-1">
              <NumberInput
                label="Commission (%)" 
                name="commission"
                min={0}
                max={100}
                value={productData.commission}
                onChange={(value) => handleNumberChange('commission', value)}
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <Input 
              label="Product Sheet URL" 
              name="productSheet" 
              type="url" 
              value={productData.productSheetURL} 
              onChange={handleStringChange} 
            />
          </div>

          <div className="flex justify-end w-full mt-10 border-t border-gray-300 pt-4">
            <button type="submit" className="hidden" aria-hidden="true" />
            <div 
              onClick={handleSubmit}
              className="cursor-pointer"
            >
              <RoundedButton 
                color={isFormValid() ? "green" : "red"} 
                text="Submit" 
                Icon={Check}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}