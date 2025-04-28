'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SessionExpiredModalProps {
  redirectDelay?: number // en milisegundos (default: 3000)
}

export default function SessionExpiredModal({ redirectDelay = 3000 }: SessionExpiredModalProps) {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')
    }, redirectDelay)

    return () => clearTimeout(timer)
  }, [router, redirectDelay])

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo con blur */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" />
      
      {/* Tarjeta centrada */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <svg
                className="h-6 w-6 text-orange-600"
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
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Session expired
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                    Redirecting to login...
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <div className="flex justify-center">
              <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-orange-600">
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Redirecting...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}