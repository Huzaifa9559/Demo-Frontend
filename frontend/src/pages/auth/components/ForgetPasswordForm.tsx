import { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from '@components';
import { Link } from 'react-router-dom';
import { ROUTE_URLS } from '@utils';

export interface ForgetPasswordFormProps {
  onRequestOtp: (email: string) => Promise<void>;
  onVerifyOtp: (email: string, otp: string) => Promise<void>;
  onResetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

type RequestOtpFieldType = {
  email: string;
};

type VerifyOtpFieldType = {
  email: string;
  otp: string;
};

type ResetPasswordFieldType = {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

type Step = 'request' | 'verify' | 'reset';

export const ForgetPasswordForm = ({
  onRequestOtp,
  onVerifyOtp,
  onResetPassword,
  isLoading = false,
  error,
}: ForgetPasswordFormProps) => {
  const [step, setStep] = useState<Step>('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleRequestOtp: FormProps<RequestOtpFieldType>['onFinish'] = async (values) => {
    try {
      await onRequestOtp(values.email!);
      setEmail(values.email!);
      setStep('verify');
    } catch (err) {
      // Error is handled by parent
    }
  };

  const handleVerifyOtp: FormProps<VerifyOtpFieldType>['onFinish'] = async (values) => {
    try {
      await onVerifyOtp(values.email!, values.otp!);
      setOtp(values.otp!);
      setStep('reset');
    } catch (err) {
      // Error is handled by parent
    }
  };

  const handleResetPassword: FormProps<ResetPasswordFieldType>['onFinish'] = async (values) => {
    try {
      await onResetPassword(values.email!, values.otp!, values.newPassword!);
    } catch (err) {
      // Error is handled by parent
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forget Password</h1>

        {step === 'request' && (
          <Form
            name="request-otp"
            layout="vertical"
            className="space-y-4"
            onFinish={handleRequestOtp}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full"
              loading={isLoading}
            >
              Send OTP
            </Button>
          </Form>
        )}

        {step === 'verify' && (
          <Form
            name="verify-otp"
            layout="vertical"
            className="space-y-4"
            initialValues={{ email }}
            onFinish={handleVerifyOtp}
          >
            <Form.Item
              label="Email"
              name="email"
              hidden
            >
              <Input type="hidden" />
            </Form.Item>

            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-600 text-sm text-center">
                OTP has been sent to your email. Please check your inbox.
                {import.meta.env.DEV && (
                  <span className="block mt-2 font-semibold">Mock OTP: 123456</span>
                )}
              </p>
            </div>

            <Form.Item
              label="OTP"
              name="otp"
              rules={[
                { required: true, message: 'Please input the OTP!' },
                { len: 6, message: 'OTP must be 6 digits!' }
              ]}
            >
              <Input placeholder="Enter 6-digit OTP" maxLength={6} />
            </Form.Item>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                type="default" 
                className="flex-1"
                onClick={() => setStep('request')}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="flex-1"
                loading={isLoading}
              >
                Verify OTP
              </Button>
            </div>
          </Form>
        )}

        {step === 'reset' && (
          <Form
            name="reset-password"
            layout="vertical"
            className="space-y-4"
            initialValues={{ email, otp }}
            onFinish={handleResetPassword}
          >
            <Form.Item
              label="Email"
              name="email"
              hidden
            >
              <Input type="hidden" />
            </Form.Item>

            <Form.Item
              label="OTP"
              name="otp"
              hidden
            >
              <Input type="hidden" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please input your new password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                type="default" 
                className="flex-1"
                onClick={() => setStep('verify')}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="flex-1"
                loading={isLoading}
              >
                Reset Password
              </Button>
            </div>
          </Form>
        )}

        <div className="mt-4 text-sm text-center">
          <p className="text-gray-600">
            Remember your password?{' '}
            <Link to={ROUTE_URLS.login} className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


