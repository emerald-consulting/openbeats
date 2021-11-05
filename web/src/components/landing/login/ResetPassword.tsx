import React from 'react'

const ResetPassword: React.FC = () => {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? 'http://api.openbeats716.com/auth/password_reset/'
      : 'http://localhost:8000/auth/password_reset/'

  return <iframe src={baseURL} title="Frame" />
}

export default ResetPassword
