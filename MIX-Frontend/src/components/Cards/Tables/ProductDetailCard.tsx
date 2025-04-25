'use client'
import { useState, useEffect } from 'react'
import { ProductUpdate } from '@/types/Product'
import { ProductDetailCardProps } from '@/types/DetailCards'

export default function ProductDetailCard({
  product: initialProduct,
  onClose,
  onSave = () => {},
  onDelete = () => {},
  editButtonText = 'Edit',
  closeButtonText = 'Close',
  saveButtonText = 'Save',
  deleteButtonText = 'Delete'
}: ProductDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(initialProduct)
  const [editedProduct, setEditedProduct] = useState<ProductUpdate & { refNum: string }>({
    refNum: initialProduct.RefNum,
    Name: initialProduct.Name,
    Description: '',
    UnitaryPrice: initialProduct.UnitaryPrice,
    Commission: initialProduct.Commission,
    ProductSheetURL: ''
  })
  const [commissionError, setCommissionError] = useState('')
  const [commissionInput, setCommissionInput] = useState(initialProduct.Commission.toString())

  // Update states when initialProduct prop changes
  useEffect(() => {
    setCurrentProduct(initialProduct)
    setEditedProduct({
      refNum: initialProduct.RefNum,
      Name: initialProduct.Name,
      Description: '',
      UnitaryPrice: initialProduct.UnitaryPrice,
      Commission: initialProduct.Commission,
      ProductSheetURL: ''
    })
    setCommissionInput(initialProduct.Commission.toString())
  }, [initialProduct])

  const handleEdit = () => {
    setIsEditing(true)
    setCommissionError('')
    setCommissionInput(editedProduct.Commission.toString())
  }

  const handleSave = () => {
    if (commissionError) return
    
    // Ensure valid values
    const finalCommission = parseFloat(commissionInput) || 0
    const updatedProduct: ProductUpdate & { refNum: string } = {
      ...editedProduct,
      Commission: Math.min(100, Math.max(0, finalCommission))
    }

    setCurrentProduct({
      ...currentProduct,
      RefNum: updatedProduct.refNum,
      Name: updatedProduct.Name,
      UnitaryPrice: updatedProduct.UnitaryPrice,
      Commission: updatedProduct.Commission,
    })
    
    onSave(updatedProduct)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProduct({
      refNum: currentProduct.RefNum,
      Name: currentProduct.Name,
      Description: '',
      UnitaryPrice: currentProduct.UnitaryPrice,
      Commission: currentProduct.Commission,
      ProductSheetURL: ''
    })
    setCommissionInput(currentProduct.Commission.toString())
    setIsEditing(false)
    setCommissionError('')
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(initialProduct.Index)
      onClose()
    }
  }

  const handleChange = (field: keyof ProductUpdate, value: string | number) => {
    setEditedProduct(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const handleCommissionChange = (value: string) => {
    if (value === '') {
      setCommissionInput('')
      setCommissionError('')
      handleChange('Commission', 0)
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setCommissionError('Please enter a valid number')
      return
    }

    if (numValue < 0) {
      setCommissionError('Commission cannot be less than 0%')
      setCommissionInput('0')
      handleChange('Commission', 0)
      return
    }

    if (numValue > 100) {
      setCommissionError('Commission cannot be more than 100%')
      setCommissionInput('100')
      handleChange('Commission', 100)
      return
    }

    setCommissionError('')
    setCommissionInput(value)
    handleChange('Commission', numValue)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.Name}
                onChange={(e) => handleChange('Name', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              currentProduct.Name
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
            <h3 className="font-semibold text-gray-500">Reference Number</h3>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.refNum}
                onChange={(e) => setEditedProduct(prev => ({...prev, refNum: e.target.value}))}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{currentProduct.RefNum}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Price</h3>
            {isEditing ? (
              <input
                type="text"
                value={formatCurrency(editedProduct.UnitaryPrice)}
                onChange={(e) => handleChange('UnitaryPrice', parseFloat(e.target.value.replace(/[^0-9.-]+/g, '')))}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{formatCurrency(currentProduct.UnitaryPrice)}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Commission</h3>
            {isEditing ? (
              <div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={commissionInput}
                    onChange={(e) => handleCommissionChange(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="0-100"
                  />
                  <span className="ml-2">%</span>
                </div>
                {commissionError && (
                  <p className="text-red-500 text-sm mt-1">{commissionError}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-700">{currentProduct.Commission}%</p>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-500">Product Sheet</h3>
            <div className="mt-1">
              {isEditing ? (
                <div className="p-2 border rounded bg-gray-50 text-gray-500 text-sm">
                  [File editing not implemented]
                </div>
              ) : (
                currentProduct.ProductSheetURL
              )}
            </div>
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
                disabled={!!commissionError || commissionInput === ''}
                className={`px-4 py-2 rounded-md transition-colors ${
                  commissionError || commissionInput === ''
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
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