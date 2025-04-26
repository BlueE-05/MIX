'use client'
import { useState, useEffect } from 'react'
import LabelOval from '@/components/Buttons/LabelOval'
import { ContactData, ContactRecieve } from '@/types/ContactTypes'
import { updateContact } from '@/hooks/contacts/updateContact'
import { deleteContact } from '@/hooks/contacts/deleteContact'

interface ContactDetailCardProps {
  contact: ContactRecieve;
  onClose: () => void;
  onSave?: (id: number, data: ContactData) => void;
  editButtonText?: string;
  closeButtonText?: string;
  saveButtonText?: string;
  deleteButtonText?: string;
}

export default function ContactDetailCard({
  contact,
  onClose,
  editButtonText = 'Edit',
  closeButtonText = 'Close',
  saveButtonText = 'Save',
  deleteButtonText = 'Delete'
}: ContactDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editedContact, setEditedContact] = useState<ContactData>({
    name: contact.Name,
    lastName: contact.LastName,
    email: contact.Email,
    phoneNumber: contact.PhoneNumber,
    enterpriseName: contact.EnterpriseName
  })

  // Initialize editedContact with transformed data when component mounts or contact changes
  useEffect(() => {
    setEditedContact({
      name: contact.Name,
      lastName: contact.LastName,
      email: contact.Email,
      phoneNumber: contact.PhoneNumber,
      enterpriseName: contact.EnterpriseName
    })
  }, [contact])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await updateContact(contact.ID, editedContact)
      setIsEditing(false)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update contact")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setIsLoading(true)
      setError(null)
      try {
        await deleteContact(contact.ID)
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete contact")
        console.error("Error deleting contact:", err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (field: keyof ContactData, value: string) => {
    setEditedContact(prev => ({
      ...prev,
      [field]: value
    }))
  }

  console.log("editedContact:", editedContact) //<-

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedContact.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isLoading}
                />
                <input
                  type="text"
                  value={editedContact.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isLoading}
                />
              </div>
            ) : (
              `${contact.Name} ${contact.LastName}`
            )}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            disabled={isLoading}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Enterprise</h3>
            {isEditing ? (
              <input
                type="text"
                value={editedContact.enterpriseName}
                onChange={(e) => handleChange('enterpriseName', e.target.value)}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              />
            ) : (
              <p className="text-gray-700">{contact.EnterpriseName}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Phone</h3>
            {isEditing ? (
              <input
                type="tel"
                value={editedContact.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="w-full p-2 border rounded"
                disabled={isLoading}
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
                value={editedContact.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-2 border rounded"
                disabled={isLoading}
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
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {deleteButtonText}
                </button>
              </div>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : saveButtonText}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {editButtonText}
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-[#0C43A8] text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={isLoading}
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