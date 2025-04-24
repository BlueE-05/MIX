'use client'
import { ReactNode, useState } from 'react'
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
  onSave?: (updatedContact: {
    id: number
    name: string
    lastName: string
    enterprise: string
    status: string
    phone: string
    email: string
  }) => void
  onDelete?: (contactId: number) => void
  editButtonText?: string
  closeButtonText?: string
  saveButtonText?: string
  deleteButtonText?: string
}

export default function ContactDetailCard({
  contact,
  onClose,
  onSave = () => {},
  onDelete = () => {},
  editButtonText = 'Edit',
  closeButtonText = 'Close',
  saveButtonText = 'Save',
  deleteButtonText = 'Delete'
}: ContactDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  
  // Función para normalizar el status a string
  const normalizeStatus = (status: ReactNode | string): string => {
    if (typeof status === 'string') return status
    return 'Active' 
  }

  const [editedContact, setEditedContact] = useState({
    ...contact,
    status: normalizeStatus(contact.status)
  })

  const renderStatus = () => {
    const statusString = normalizeStatus(contact.status)
    const color = statusString === 'Active' ? 'green' : 'red'
    return <LabelOval color={color} data={statusString} />
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onSave(editedContact)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedContact({
      ...contact,
      status: normalizeStatus(contact.status)
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      onDelete(contact.id)
      onClose()
    }
  }

  const handleChange = (field: keyof typeof editedContact, value: string) => {
    setEditedContact(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedContact.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={editedContact.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </>
            ) : (
              `${contact.name} ${contact.lastName}`
            )}
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
            {isEditing ? (
              <input
                type="text"
                value={editedContact.enterprise}
                onChange={(e) => handleChange('enterprise', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{contact.enterprise}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Status</h3>
            {isEditing ? (
              <select
                value={editedContact.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            ) : (
              <div className="mt-1">{renderStatus()}</div>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Phone</h3>
            {isEditing ? (
              <input
                type="text"
                value={editedContact.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{contact.phone}</p>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-500">Email</h3>
            {isEditing ? (
              <input
                type="email"
                value={editedContact.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{contact.email}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <>
              <div className="flex space-x-2">
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  {deleteButtonText}
                </button>
              </div>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                {saveButtonText}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {editButtonText}
              </button>
              <div className="flex space-x-2">
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  {deleteButtonText}
                </button>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-[#0C43A8] text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {closeButtonText}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}