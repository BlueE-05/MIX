'use client'
import { useState, useEffect } from 'react'
import { ProductUpdate, ProductReceive } from '@/types/ProductTypes'
import { updateProduct } from '@/hooks/product/updateProduct'
import { deleteProduct } from '@/hooks/product/deleteProduct'
import NumberInput from '@/components/Forms/NumberInput'

interface ProductDetailCardProps {
  product: ProductReceive;
  onClose: () => void;
  onSave?: (refNum: string, data: ProductUpdate) => void;
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
}

export default function ProductDetailCard({
  product,
  onClose,
  onSave,
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? (
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
      </div>
    </div>
  )
}