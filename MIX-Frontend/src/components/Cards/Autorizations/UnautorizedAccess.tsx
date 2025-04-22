'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function UnauthorizedAccess() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          {/* Icono de advertencia */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Título y mensaje */}
          <h2 className="text-2xl font-bold text-gray-800">Unauthorized access</h2>
          <p className="text-center text-gray-600">
            You do not have the necessary permissions to access this page.
          </p>

          {/* Botón de acción genérico */}
          <button
            onClick={handleGoBack}
            className="mt-4 flex items-center gap-2 rounded-md border border-green-500 px-4 py-2 text-green-500 hover:bg-orange-50 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}