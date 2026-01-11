import { Modal, Form, Input, Select, Tag, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { ResourceRecord, ResourceType, ResourceStatus } from '@/types/resource';
import { RESOURCE_TYPE_OPTIONS, RESOURCE_STATUS_OPTIONS } from '@/types/resource';
import type { CreateResourcePayload } from '@/services/api-calls-hooks/resources';

const { TextArea } = Input;

type ResourceFormValues = CreateResourcePayload;

type ResourceFormModalProps = {
  open: boolean;
  mode: 'create' | 'edit';
  resource?: ResourceRecord | null;
  onSubmit: (values: ResourceFormValues) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
};

export const ResourceFormModal = ({
  open,
  mode,
  resource,
  onSubmit,
  onCancel,
  loading = false,
}: ResourceFormModalProps) => {
  const [form] = Form.useForm<ResourceFormValues>();
  const [tags, setTags] = useState<string[]>(resource?.tags || []);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && resource) {
        form.setFieldsValue({
          title: resource.title,
          description: resource.description || undefined,
          type: resource.type,
          category: resource.category || undefined,
          url: resource.url,
          status: resource.status,
          author: resource.author || undefined,
        });
        setTags(resource.tags);
      } else {
        form.resetFields();
        setTags([]);
      }
    }
  }, [open, mode, resource, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit({
        ...values,
        tags,
        description: values.description || null,
        category: values.category || null,
        author: values.author || null,
      });
      form.resetFields();
      setTags([]);
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Modal
      open={open}
      title={mode === 'edit' ? 'Edit Resource' : 'Create New Resource'}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      okText={mode === 'edit' ? 'Save Changes' : 'Create'}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          type: 'other',
          status: 'active',
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter resource title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea
            rows={3}
            placeholder="Enter resource description"
          />
        </Form.Item>

        <Form.Item
          name="url"
          label="URL"
          rules={[
            { required: true, message: 'Please enter a URL' },
            { type: 'url', message: 'Please enter a valid URL' },
          ]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Space direction="vertical" size="middle" className="w-full">
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select resource type"
              options={RESOURCE_TYPE_OPTIONS.filter((opt) => opt.value !== 'all')}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
          >
            <Input placeholder="Enter category" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select status"
              options={RESOURCE_STATUS_OPTIONS.filter((opt) => opt.value !== 'all')}
            />
          </Form.Item>

          <Form.Item
            name="author"
            label="Author"
          >
            <Input placeholder="Enter author name" />
          </Form.Item>

          <Form.Item label="Tags">
            <Space direction="vertical" size="small" className="w-full">
              <Space wrap>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    closable
                    onClose={() => handleRemoveTag(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </Space>
              <Space.Compact className="w-full">
                <Input
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onPressEnter={handleAddTag}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </Space.Compact>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

