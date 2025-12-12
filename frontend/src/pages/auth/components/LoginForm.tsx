import type { FormProps } from 'antd';
import { Button, Form, Input } from '@components';

export interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => void;
  isLoading?: boolean;
  error?: string | null;
}

type FieldType = {
  email: string;
  password: string;
};

export const LoginForm = ({ onSubmit, isLoading = false, error }: LoginFormProps) => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    onSubmit({
      email: values.email!,
      password: values.password!,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <Form
          name="login"
          layout="vertical"
          className="space-y-4"
          onFinish={onFinish}
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

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
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
            Login
          </Button>
        </Form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          <p className="mb-2">Demo credentials:</p>
          <p>Admin: admin@example.com / admin123</p>
          <p>User: user@example.com / user123</p>
        </div>
      </div>
    </div>
  );
};

