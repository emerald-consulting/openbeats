import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { http } from '../../../api/auth';

const ResetPassword = () => {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? 'http://api.openbeats716.com/auth/password_reset/'
      : 'http://localhost:8000/auth/password_reset/';

  return <iframe src={baseURL} title="Frame" />;
};

export default ResetPassword;
