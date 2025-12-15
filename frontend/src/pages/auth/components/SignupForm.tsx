import type { FormProps } from 'antd';
import { Button, Form, Input } from '@components';
import { Link } from 'react-router-dom';
import { ROUTE_URLS } from '@utils';

export interface SignupFormProps {
  onSubmit: (values: { email: string; password: string; name: string }) => void;
  isLoading?: boolean;
  error?: string | null;
}

type FieldType = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

export const SignupForm = ({ onSubmit, isLoading = false, error }: SignupFormProps) => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    onSubmit({
      email: values.email!,
      password: values.password!,
      name: values.name!,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <Form
          name="signup"
          layout="vertical"
          className="space-y-4"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input your name!' },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

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

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
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
            Sign Up
          </Button>
        </Form>

        <div className="mt-4 text-sm text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to={ROUTE_URLS.login} className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


