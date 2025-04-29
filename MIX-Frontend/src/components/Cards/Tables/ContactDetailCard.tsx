'use client'
import { useState, useEffect } from 'react'
import { ContactData, ContactReceive } from '@/types/ContactTypes'
import { updateContact } from '@/hooks/contacts/updateContact'
import { deleteContact } from '@/hooks/contacts/deleteContact'
import { fetchEnterprises } from '@/hooks/enterprises/fetchEnterprises'
import { EnterpriseGet } from '@/types/EnterpriseTypes'

interface ContactDetailCardProps {
  contact: ContactReceive;
  onClose: () => void;
  onSave?: (id: number, data: ContactData) => void;
  editButtonText?: string;
  closeButtonText?: string;
  saveButtonText?: string;
  deleteButtonText?: string;
}

const MAX_LENGTHS = {
  name: 100,
  lastName: 100,
  phoneNumber: 30,
  email: 255,
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
  const [enterprises, setEnterprises] = useState<EnterpriseGet[]>([])
  const [editedContact, setEditedContact] = useState<ContactData>({
    Name: contact.Name,
    LastName: contact.LastName,
    Email: contact.Email,
    PhoneNumber: contact.PhoneNumber,
    EnterpriseName: contact.EnterpriseName
  })
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const enterprisesData = await fetchEnterprises()
        setEnterprises(enterprisesData)
        setEditedContact({
          Name: contact.Name,
          LastName: contact.LastName,
          Email: contact.Email,
          PhoneNumber: contact.PhoneNumber,
          EnterpriseName: contact.EnterpriseName
        })
      } catch (error) {
        setError('Failed to load enterprises data')
        console.error("Error loading enterprises:", error)
      }
    }
    loadData()
  }, [contact])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Validate lengths before saving
      if (editedContact.Name.length > MAX_LENGTHS.name) {
        throw new Error(`Name must be ${MAX_LENGTHS.name} characters or less`)
      }
      if (editedContact.LastName.length > MAX_LENGTHS.lastName) {
        throw new Error(`Last name must be ${MAX_LENGTHS.lastName} characters or less`)
      }
      if (editedContact.PhoneNumber.length > MAX_LENGTHS.phoneNumber) {
        throw new Error(`Phone number must be ${MAX_LENGTHS.phoneNumber} characters or less`)
      }
      if (editedContact.Email.length > MAX_LENGTHS.email) {
        throw new Error(`Email must be ${MAX_LENGTHS.email} characters or less`)
      }

      await updateContact(contact.ID, editedContact)
      setIsEditing(false)
      onClose()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update contact")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
  }

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };


  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    setError(null);
    try {
      await deleteContact(contact.ID);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete contact");
      console.error("Error deleting contact:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleChange = (field: keyof ContactData, value: string) => {
    // Apply length limit according to field
    let trimmedValue = value
    switch (field) {
      case 'Name':
        trimmedValue = value.slice(0, MAX_LENGTHS.name)
        break
      case 'LastName':
        trimmedValue = value.slice(0, MAX_LENGTHS.lastName)
        break
      case 'PhoneNumber':
        trimmedValue = value.slice(0, MAX_LENGTHS.phoneNumber)
        break
      case 'Email':
        trimmedValue = value.slice(0, MAX_LENGTHS.email)
        break
    }
    setEditedContact(prev => ({
      ...prev,
      [field]: trimmedValue
    }))
  }

  const isEditedContactValid = () => {
    return (
      editedContact.Name.trim() !== '' &&
      editedContact.LastName.trim() !== '' &&
      editedContact.Email.trim() !== '' &&
      editedContact.EnterpriseName.trim() !== ''
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? (
              <div className="space-y-2">
                <div>
                  <input
                    type="text"
                    value={editedContact.Name}
                    onChange={(e) => handleChange('Name', e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={isLoading}
                    maxLength={MAX_LENGTHS.name}
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {editedContact.Name.length}/{MAX_LENGTHS.name}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    value={editedContact.LastName}
                    onChange={(e) => handleChange('LastName', e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={isLoading}
                    maxLength={MAX_LENGTHS.lastName}
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {editedContact.LastName.length}/{MAX_LENGTHS.lastName}
                  </div>
                </div>
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
              <div className="mt-1">
                <select
                  value={editedContact.EnterpriseName}
                  onChange={(e) => handleChange('EnterpriseName', e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isLoading}
                >
                  <option value="">Select Enterprise</option>
                  {enterprises.map((enterprise) => (
                    <option key={enterprise.ID} value={enterprise.Name}>
                      {enterprise.Name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-gray-700">{contact.EnterpriseName}</p>
            )}
          </div>

          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Phone</h3>
            {isEditing ? (
              <div>
                <input
                  type="tel"
                  value={editedContact.PhoneNumber}
                  onChange={(e) => handleChange('PhoneNumber', e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isLoading}
                  maxLength={MAX_LENGTHS.phoneNumber}
                />
                <div className="text-xs text-gray-500 text-right">
                  {editedContact.PhoneNumber.length}/{MAX_LENGTHS.phoneNumber}
                </div>
              </div>
            ) : (
              <p className="text-gray-700">{contact.PhoneNumber}</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-500">Email</h3>
            {isEditing ? (
              <div>
                <input
                  type="email"
                  value={editedContact.Email}
                  onChange={(e) => handleChange('Email', e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isLoading}
                  maxLength={MAX_LENGTHS.email}
                />
                <div className="text-xs text-gray-500 text-right">
                  {editedContact.Email.length}/{MAX_LENGTHS.email}
                </div>
              </div>
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
                  onClick={handleDeleteClick}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {deleteButtonText}
                </button>
              </div>
              <button
              onClick={handleSave}
              className={`px-4 py-2 ${isEditedContactValid() ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'} text-white rounded-md transition-colors disabled:opacity-50`}
              disabled={isLoading || !isEditedContactValid()}
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
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to delete this contact?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}