import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { authService } from '@/services/authService'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string>('Đang xác thực email...')

  useDocumentTitle('Xác thực email - Chùa Diệu Pháp')

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setStatus('error')
      setMessage('Mã xác thực không hợp lệ. Vui lòng kiểm tra lại liên kết email.')
      return
    }

    const verify = async () => {
      setStatus('loading')
      try {
        await authService.verifyEmail(token)
        setStatus('success')
        setMessage('Email của bạn đã được xác thực thành công. Bạn có thể đăng nhập ngay bây giờ.')
      } catch (error) {
        console.error(error)
        // If API returns message that email is already verified, show a friendly notice instead of generic error
        if (isAxiosError(error)) {
          const respMsg = (error.response?.data?.message || '').toString()
          if (/already verified|email is already verified|đã.*xác thực/i.test(respMsg)) {
            setStatus('success')
            setMessage('Email của bạn đã được xác thực trước đó.')
            return
          }
        }

        setStatus('error')
        setMessage('Xác thực email thất bại. Liên kết có thể đã hết hạn hoặc không hợp lệ.')
      }
    }

    verify()
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8] p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
        <div className="text-[#2d4a3e] text-4xl mb-3">☸</div>
        <h1 className="text-3xl font-semibold text-[#2d4a3e] mb-2">Xác thực Email</h1>
        <p className="text-sm text-[#5a7060]">
          {status === 'loading' ? 'Vui lòng chờ trong giây lát...' : 'Kết quả xác thực email của bạn.'}
        </p>
      </div>

      <div className={`p-6 rounded-2xl border ${status === 'success' ? 'border-green-200 bg-green-50 text-green-900' : status === 'error' ? 'border-red-200 bg-red-50 text-red-900' : 'border-gray-200 bg-white text-[#1a2e25]'}`}>
        <p className="text-sm leading-relaxed">{message}</p>
      </div>

      <div className="mt-8 text-center space-y-4">
        {status === 'success' ? (
          <Link
            to="/auth/login"
            className="inline-block px-6 py-3 bg-[#2d4a3e] text-white rounded-lg hover:bg-[#1a2e25] transition-colors"
          >
            Đăng nhập ngay
          </Link>
        ) : (
          <Link
            to="/auth/login"
            className="inline-block px-6 py-3 border border-[#2d4a3e] text-[#2d4a3e] rounded-lg hover:bg-[#f2f0e8] transition-colors"
          >
            Quay lại đăng nhập
          </Link>
        )}
        <div className="text-xs text-[#7a9080]">
          Nếu bạn không nhận được email, hãy kiểm tra lại hộp thư rác hoặc liên hệ quản trị viên.
        </div>
      </div>
      </div>
    </div>
  )
}
