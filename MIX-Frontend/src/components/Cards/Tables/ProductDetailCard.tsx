'use client'
import { ReactNode } from 'react'

interface ProductDetailCardProps {
  product: {
    id: number
    name: string
    refNum: string
    unitaryPrice: number
    commission: number
    productSheet: ReactNode
  }
  onClose: () => void
  onEdit?: () => void
  editButtonText?: string
  closeButtonText?: string
}

export default function ProductDetailCard({
  product,
  onClose,
  onEdit = () => {},
  editButtonText = 'Editar',
  closeButtonText = 'Cerrar'
}: ProductDetailCardProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Reference Number</h3>
            <p className="text-gray-700">{product.refNum}</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Price</h3>
            <p className="text-gray-700">${product.unitaryPrice.toFixed(2)}</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Commission</h3>
            <p className="text-gray-700">${product.commission.toFixed(2)}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-500">Product Sheet</h3>
            <div className="mt-1">{product.productSheet}</div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <button 
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {editButtonText}
          </button>
          
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            {closeButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}