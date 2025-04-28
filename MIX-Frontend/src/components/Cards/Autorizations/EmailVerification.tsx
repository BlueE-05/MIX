'use client'
import { MailCheck } from 'lucide-react'

interface EmailVerificationProps {
  isVerified?: boolean
  onContinue?: () => void
}

export default function EmailVerification({ 
  isVerified = false,
  onContinue 
}: EmailVerificationProps) {
  if (isVerified) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          {/* Icono de verificación */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <MailCheck className="h-6 w-6 text-blue-600" />
          </div>

          {/* Título y mensaje */}
          <h2 className="text-2xl font-bold text-gray-800">Check your email</h2>
          <p className="text-center text-gray-600">
            Please verify your email address to continue.
            <br />
            We&apos;ve sent a verification link to your email.
          </p>

          {/* Botón de acción */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={onContinue}
              className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors duration-200"
            >
                Continue to Dashboard
            </button>
            
            <button className="flex items-center gap-2 rounded-md border border-blue-300 px-4 py-2 text-blue-700 hover:bg-gray-50 transition-colors duration-200">
                Resend verification
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}