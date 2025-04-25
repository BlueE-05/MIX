'use client'
import { useState } from 'react'
import LabelOval from '@/components/Buttons/LabelOval'
import { ContactUpdate } from '@/types/Contact'
import { ContactDetailCardProps } from '@/types/DetailCards'

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
  
  const [editedContact, setEditedContact] = useState<ContactUpdate & { id: number }>({
    id: contact.ID,
    Name: contact.Name,
    LastName: contact.LastName,
    EnterpriseName: contact.EnterpriseName,
    Status: contact.Status,
    PhoneNumber: contact.PhoneNumber,
    Email: contact.Email
  })

  const renderStatus = () => {
    const statusString = editedContact.Status ? 'Active' : 'Inactive'
    const color = editedContact.Status ? 'green' : 'red'
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
      id: contact.ID,
      Name: contact.Name,
      LastName: contact.LastName,
      EnterpriseName: contact.EnterpriseName,
      Status: contact.Status,
      PhoneNumber: contact.PhoneNumber,
      Email: contact.Email
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      onDelete(contact.ID)
      onClose()
    }
  }

  const handleChange = (field: keyof ContactUpdate, value: string | boolean) => {
    setEditedContact((prev: any) => ({
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
                  value={editedContact.Name}
                  onChange={(e) => handleChange('Name', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={editedContact.LastName}
                  onChange={(e) => handleChange('LastName', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </>
            ) : (
              `${contact.Name} ${contact.LastName}`
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
                value={editedContact.EnterpriseName}
                onChange={(e) => handleChange('EnterpriseName', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{contact.EnterpriseName}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Status</h3>
            {isEditing ? (
              <select
                value={editedContact.Status ? 'Active' : 'Inactive'}
                onChange={(e) => handleChange('Status', e.target.value === 'Active')}
                className="w-full p-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
                value={editedContact.PhoneNumber}
                onChange={(e) => handleChange('PhoneNumber', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{contact.PhoneNumber}</p>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-500">Email</h3>
            {isEditing ? (
              <input
                type="email"
                value={editedContact.Email}
                onChange={(e) => handleChange('Email', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{contact.Email}</p>
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
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-[#0C43A8] text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {closeButtonText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}