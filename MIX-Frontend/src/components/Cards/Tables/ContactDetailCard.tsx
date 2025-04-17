'use client'
import { ReactNode } from 'react'
import LabelOval from '@/components/Buttons/LabelOval'

interface ContactDetailCardProps {
  contact: {
    id: number
    name: string
    lastName: string
    enterprise: string
    status: ReactNode | string
    phone: string
    email: string
  }
  onClose: () => void
  onEdit?: () => void
  editButtonText?: string
  closeButtonText?: string
}

export default function ContactDetailCard({
  contact,
  onClose,
  onEdit = () => {},
  editButtonText = 'Editar',
  closeButtonText = 'Cerrar'
}: ContactDetailCardProps) {
  // Función para determinar el estado si viene como string
  const renderStatus = () => {
    if (typeof contact.status === 'string') {
      const color = contact.status === 'Active' || contact.status === 'Pendiente' ? 'green' : 'red'
      return <LabelOval color={color} data={contact.status} />
    }
    return contact.status
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {contact.name} {contact.lastName}
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
            <p className="text-gray-700">{contact.enterprise}</p>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Status</h3>
            <div className="mt-1">{renderStatus()}</div>
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Phone</h3>
            <p className="text-gray-700">{contact.phone}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-500">Email</h3>
            <p className="text-gray-700">{contact.email}</p>
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
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            {closeButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}