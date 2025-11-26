import { DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { STATUS_OPTIONS } from '@constants/filters'
import {
  PROJECT_CODE_RULES,
  PROJECT_DUE_DATE_RULES,
  PROJECT_NAME_RULES,
  PROJECT_OWNER_RULES,
  PROJECT_STATUS_RULES,
  PROJECT_TICKETS_RULES,
} from '@validators/projectRules'
import type { ProjectRecord } from '@data/projects'
import { useProjectsContext } from '../context/ProjectsContext'

export type ProjectFormValues = {
  name: string
  projectCode: string
  owner: string
  status: ProjectRecord['status']
  dueDate: Dayjs
  tickets: number
}

type ProjectFormModalProps = {
  className?: string
}

export const ProjectFormModal = ({ className }: ProjectFormModalProps = {}) => {
  const {
    isFormOpen,
    formMode,
    selectedProject,
    handleFormSubmit,
    closeForm,
  } = useProjectsContext()
  const [form] = Form.useForm<ProjectFormValues>()

  const handleOk = async () => {
    const values = await form.validateFields()
    await handleFormSubmit(values)
  }

  const handleAfterOpen = () => {
    if (selectedProject && formMode === 'edit') {
      form.setFieldsValue({
        ...selectedProject,
        dueDate: dayjs(selectedProject.dueDate, 'MMM D, YYYY'),
      })
    } else {
      form.setFieldsValue({
        status: 'In Progress',
        tickets: 0,
        dueDate: dayjs(),
        projectCode: 'PRJ-',
      })
    }
  }

  return (
    <Modal
      open={isFormOpen}
      title={formMode === 'create' ? 'Create new project' : 'Edit project'}
      onCancel={() => {
        form.resetFields()
        closeForm()
      }}
      onOk={handleOk}
      afterOpenChange={(visible) => {
        if (visible) {
          handleAfterOpen()
        } else {
          form.resetFields()
        }
      }}
      okText={formMode === 'create' ? 'Create' : 'Save changes'}
      className={className}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: 'In Progress',
          tickets: 0,
          dueDate: dayjs(),
          projectCode: 'PRJ-',
        }}
      >
        <Form.Item label="Project name" name="name" rules={PROJECT_NAME_RULES}>
          <Input
            placeholder="Portal redesign"
            allowClear
            showCount
            maxLength={80}
          />
        </Form.Item>
        <Form.Item
          label="Project code"
          name="projectCode"
          rules={PROJECT_CODE_RULES}
          normalize={(value: string) => value?.toUpperCase() ?? value}
        >
          <Input placeholder="PRJ-123" maxLength={7} inputMode="text" />
        </Form.Item>
        <Form.Item
          label="Owner"
          name="owner"
          rules={PROJECT_OWNER_RULES}
        >
          <Input placeholder="Jane Cooper" allowClear maxLength={60} />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={PROJECT_STATUS_RULES}>
          <Select
            options={STATUS_OPTIONS.filter((option) => option.value !== 'all')}
          />
        </Form.Item>
        <Form.Item
          label="Due date"
          name="dueDate"
          rules={PROJECT_DUE_DATE_RULES}
        >
          <DatePicker
            className="w-full"
            format="MMM D, YYYY"
            disabledDate={(current) => current && current < dayjs().startOf('day')}
          />
        </Form.Item>
        <Form.Item
          label="Open tickets"
          name="tickets"
          rules={PROJECT_TICKETS_RULES}
        >
          <InputNumber className="w-full" min={0} max={500} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

