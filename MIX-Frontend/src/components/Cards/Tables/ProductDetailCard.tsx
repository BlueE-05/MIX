'use client'
<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { ProductUpdate, ProductReceive } from '@/types/ProductTypes'
import { updateProduct } from '@/hooks/product/updateProduct'
import { deleteProduct } from '@/hooks/product/deleteProduct'
import NumberInput from '@/components/Forms/NumberInput'

interface ProductDetailCardProps {
  product: ProductReceive;
  onClose: () => void;
  editButtonText?: string;
  closeButtonText?: string;
  saveButtonText?: string;
  deleteButtonText?: string;
}

const MAX_LENGTHS = {
  refNum: 50,
  name: 100,
  description: 255,
  productSheetURL: 255,
=======
import { ReactNode, useState } from 'react'

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
  onSave?: (updatedProduct: {
    id: number
    name: string
    refNum: string
    unitaryPrice: number
    commission: number
    productSheet: ReactNode
  }) => void
  editButtonText?: string
  closeButtonText?: string
  saveButtonText?: string
>>>>>>> origin/pruebanewmerge_sales_report
}

export default function ProductDetailCard({
  product,
  onClose,
<<<<<<< HEAD
  editButtonText = 'Edit',
  closeButtonText = 'Close',
  saveButtonText = 'Save',
  deleteButtonText = 'Delete'
}: ProductDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editedProduct, setEditedProduct] = useState<ProductUpdate & { refNum: string }>({
    refNum: product.RefNum,
    Name: product.Name,
    Description: product.Description,
    UnitaryPrice: product.UnitaryPrice,
    Commission: product.Commission,
    ProductSheetURL: product.ProductSheetURL
  })

  useEffect(() => {
    setEditedProduct({
      refNum: product.RefNum,
      Name: product.Name,
      Description: product.Description,
      UnitaryPrice: product.UnitaryPrice,
      Commission: product.Commission,
      ProductSheetURL: product.ProductSheetURL
    })
  }, [product])

  const handleEdit = () => {
    setIsEditing(true)
    setError(null)
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate lengths before saving
      if (editedProduct.refNum.length > MAX_LENGTHS.refNum) {
        throw new Error(`Reference number must be ${MAX_LENGTHS.refNum} characters or less`)
      }
      if (editedProduct.Name.length > MAX_LENGTHS.name) {
        throw new Error(`Name must be ${MAX_LENGTHS.name} characters or less`)
      }
      if (editedProduct.Description.length > MAX_LENGTHS.description) {
        throw new Error(`Description must be ${MAX_LENGTHS.description} characters or less`)
      }
      if (editedProduct.ProductSheetURL.length > MAX_LENGTHS.productSheetURL) {
        throw new Error(`Product sheet URL must be ${MAX_LENGTHS.productSheetURL} characters or less`)
      }
      if (editedProduct.Commission < 0) {
        throw new Error('Commission cannot be less than 0%')
      }
      if (editedProduct.Commission > 100) {
        throw new Error('Commission cannot be more than 100%')
      }

      const updatedData: ProductUpdate = {
        ...editedProduct,
      }

      await updateProduct(product.RefNum, updatedData)
      setIsEditing(false)
      onClose()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update product")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsLoading(true)
      setError(null)
      try {
        await deleteProduct(product.RefNum)
        onClose()
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to delete product")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (field: keyof ProductUpdate, value: string | number) => {
    // Apply length limit according to field
    let trimmedValue = value
    if (typeof value === 'string') {
      switch (field) {
        case 'Name':
          trimmedValue = value.slice(0, MAX_LENGTHS.name)
          break
        case 'Description':
          trimmedValue = value.slice(0, MAX_LENGTHS.description)
          break
        case 'ProductSheetURL':
          trimmedValue = value.slice(0, MAX_LENGTHS.productSheetURL)
          break
      }
    }

    setEditedProduct(prev => ({
      ...prev,
      [field]: trimmedValue
    }))
  }

=======
  onSave = () => {},
  editButtonText = 'Edit',
  closeButtonText = 'Close',
  saveButtonText = 'Save'
}: ProductDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState({ ...product })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onSave(editedProduct)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProduct({ ...product })
    setIsEditing(false)
  }

  const handleChange = (field: keyof typeof editedProduct, value: string | number) => {
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

  const parseCurrency = (value: string) => {
    return parseFloat(value.replace(/[^0-9.-]+/g, ''))
  }

>>>>>>> origin/pruebanewmerge_sales_report
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? (
<<<<<<< HEAD
              <div>
                <input
                  type="text"
                  value={editedProduct.Name}
                  onChange={(e) => handleChange('Name', e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isLoading}
                  maxLength={MAX_LENGTHS.name}
                />
                <div className="text-xs text-gray-500 text-right">
                  {editedProduct.Name.length}/{MAX_LENGTHS.name}
                </div>
              </div>
            ) : (
              product.Name
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            disabled={isLoading}
            aria-label="Close"
=======
              <input
                type="text"
                value={editedProduct.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              product.name
            )}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
>>>>>>> origin/pruebanewmerge_sales_report
          >
            &times;
          </button>
        </div>
<<<<<<< HEAD

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Reference Number</h3>
            <div>
              <p className="text-gray-700">{product.RefNum}</p>
            </div>
          </div>

          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Description</h3>
            {isEditing ? (
              <div>
                <textarea
                  value={editedProduct.Description}
                  onChange={(e) => handleChange('Description', e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isLoading}
                  maxLength={MAX_LENGTHS.description}
                  rows={3}
                />
                <div className="text-xs text-gray-500 text-right">
                  {editedProduct.Description.length}/{MAX_LENGTHS.description}
                </div>
              </div>
            ) : (
              <p className="text-gray-700 whitespace-pre-wrap">{product.Description || 'No description'}</p>
            )}
          </div>

          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Price</h3>
            {isEditing ? (
              <NumberInput
                value={editedProduct.UnitaryPrice}
                name="UnitaryPrice"
                min={0}
                step={0.01}
                onChange={(value) => handleChange('UnitaryPrice', value)}
              />
            ) : (
              <p className="text-gray-700">${editedProduct.UnitaryPrice.toFixed(2)}</p>
            )}
          </div>

          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Commission</h3>
            {isEditing ? (
              <NumberInput
                value={editedProduct.Commission}
                name="Commission"
                min={0}
                max={100}
                step={0.01}
                onChange={(value) => handleChange('Commission', value)}
              />
            ) : (
              <p className="text-gray-700">{product.Commission}%</p>
            )}
          </div>

          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Product Sheet URL</h3>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={editedProduct.ProductSheetURL}
                  onChange={(e) => handleChange('ProductSheetURL', e.target.value)}
                  className="w-full p-2 border rounded"
                  disabled={isLoading}
                  maxLength={MAX_LENGTHS.productSheetURL}
                />
                <div className="text-xs text-gray-500 text-right">
                  {editedProduct.ProductSheetURL.length}/{MAX_LENGTHS.productSheetURL}
                </div>
              </div>
            ) : (
              <p className="text-gray-700 break-all">
                {product.ProductSheetURL || 'No product sheet URL'}
              </p>
            )}
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
=======
        
        <div className="space-y-3">
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Reference Number</h3>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.refNum}
                onChange={(e) => handleChange('refNum', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{product.refNum}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Price</h3>
            {isEditing ? (
              <input
                type="text"
                value={formatCurrency(editedProduct.unitaryPrice)}
                onChange={(e) => handleChange('unitaryPrice', parseCurrency(e.target.value))}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{formatCurrency(product.unitaryPrice)}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Commission</h3>
            {isEditing ? (
              <input
                type="text"
                value={formatCurrency(editedProduct.commission)}
                onChange={(e) => handleChange('commission', parseCurrency(e.target.value))}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{formatCurrency(product.commission)}</p>
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
                product.productSheet
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <>
              <button 
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
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
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                {closeButtonText}
              </button>
            </>
          )}
        </div>
>>>>>>> origin/pruebanewmerge_sales_report
      </div>
    </div>
  )
}