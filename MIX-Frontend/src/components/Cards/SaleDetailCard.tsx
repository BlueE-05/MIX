// components/SaleDetailCard.tsx
'use client'
import { ReactNode } from 'react'

interface SaleDetailCardProps {
  sale: {
    id: number
    refNumber: string
    enterprise: string
    amount: string
    status: ReactNode | string
    lastContact: string
    closingDate: string
    creationDate: string
  }
  onClose: () => void
  onEdit?: () => void
  editButtonText?: string
  closeButtonText?: string
}

export default function SaleDetailCard({
  sale,
  onClose,
  onEdit = () => {},
  editButtonText = 'Editar',
  closeButtonText = 'Cerrar'
}: SaleDetailCardProps) {
  const renderStatus = () => {
    if (typeof sale.status === 'string') {
      const color = sale.status === 'Closed' ? 'green' : 
                   sale.status === 'In Progress' ? 'blue' : 'yellow'
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium 
          ${color === 'green' ? 'bg-green-100 text-green-800' :
            color === 'blue' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'}`}>
          {sale.status}
        </span>
      )
    }
    return sale.status
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Venta {sale.refNumber}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Enterprise</h3>
            <p className="text-gray-700">{sale.enterprise}</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Amount</h3>
            <p className="text-gray-700">{sale.amount}</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Staus</h3>
            <div className="mt-1">{renderStatus()}</div>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Last Contact</h3>
            <p className="text-gray-700">{sale.lastContact}</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Closing Date</h3>
            <p className="text-gray-700">{sale.closingDate}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-500">Creation Date</h3>
            <p className="text-gray-700">{sale.creationDate}</p>
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
            className="px-4 py-2 bg-[#0C43A8] text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {closeButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}