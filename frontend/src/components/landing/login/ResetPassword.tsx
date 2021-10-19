import { useHistory } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { http } from '../../../api/auth';
import { useState } from 'react';

const ResetPassword = () => {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? 'http://api.openbeats716.com/auth/password_reset/'
      : 'http://localhost:8000/auth/password_reset/';

  return <iframe src={baseURL} title="Frame"></iframe>;
};

export default ResetPassword;
