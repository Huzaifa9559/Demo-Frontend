import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from '@components';
import { useLoginForm } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_URLS } from '@utils';
import { useEffect } from 'react';

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { handleLogin, isAuthenticated, isLoading, error } = useLoginForm();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_URLS.home, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    handleLogin({
      email: values.email!,
      password: values.password!,
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <Form
          name="login"
          layout="vertical"
          className="space-y-4"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <Form.Item label={null}>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full"
              loading={isLoading}
            >
              Login
            </Button>
          </Form.Item>
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