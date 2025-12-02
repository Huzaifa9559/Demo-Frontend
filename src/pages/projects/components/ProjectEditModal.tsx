import { DatePicker, Input, InputNumber, Select } from "antd";
import { Modal } from "@components/ui";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { FormValidator, FormInitials } from "@utils";
import { useProjectsContext } from "../context/ProjectsContext";
import { useEffect } from "react";
import type { ProjectFormValues } from "./ProjectCreateModal";

type ProjectEditModalProps = {
  className?: string;
};

export const ProjectEditModal = ({
  className,
}: ProjectEditModalProps = {}) => {
  const {
    isFormOpen,
    formMode,
    selectedProject,
    handleFormSubmit,
    closeForm,
  } = useProjectsContext();

  const isOpen = isFormOpen && formMode === "edit";

  const formik = useFormik<ProjectFormValues>({
    initialValues: selectedProject
      ? {
          ...FormInitials.projectFormInitials(selectedProject),
          dueDate: dayjs(selectedProject.dueDate, "MMM D, YYYY"),
        }
      : FormInitials.projectFormInitials(),
    validationSchema: FormValidator.projectFormValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formattedValues = {
        ...values,
        dueDate: values.dueDate ? values.dueDate : dayjs(),
      };
      await handleFormSubmit(formattedValues as any);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (isOpen && selectedProject) {
      formik.setValues({
        ...FormInitials.projectFormInitials(selectedProject),
        dueDate: dayjs(selectedProject.dueDate, "MMM D, YYYY"),
      });
    }
  }, [isOpen, selectedProject]);

  const handleOk = async () => {
    await formik.submitForm();
  };

  const handleCancel = () => {
    formik.resetForm();
    closeForm();
  };

  const statusOptions = [
    { label: "In Progress", value: "In Progress" },
    { label: "On Hold", value: "On Hold" },
    { label: "Completed", value: "Completed" },
    { label: "Blocked", value: "Blocked" },
  ];

  return (
    <Modal
      open={isOpen}
      title="Edit project"
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Save changes"
      className={className}
      afterClose={() => {
        formik.resetForm();
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Project name
            </label>
            <Input
              name="name"
              placeholder="Portal redesign"
              allowClear
              showCount
              maxLength={80}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={formik.touched.name && formik.errors.name ? "error" : ""}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Project code
            </label>
            <Input
              name="projectCode"
              placeholder="PRJ-123"
              maxLength={7}
              inputMode="text"
              value={formik.values.projectCode}
              onChange={(e) => {
                formik.setFieldValue(
                  "projectCode",
                  e.target.value.toUpperCase()
                );
              }}
              onBlur={formik.handleBlur}
              status={
                formik.touched.projectCode && formik.errors.projectCode
                  ? "error"
                  : ""
              }
            />
            {formik.touched.projectCode && formik.errors.projectCode && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.projectCode}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Owner</label>
            <Input
              name="owner"
              placeholder="Jane Cooper"
              allowClear
              maxLength={60}
              value={formik.values.owner}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              status={
                formik.touched.owner && formik.errors.owner ? "error" : ""
              }
            />
            {formik.touched.owner && formik.errors.owner && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.owner}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <Select
              value={formik.values.status}
              onChange={(value) => formik.setFieldValue("status", value)}
              onBlur={() => formik.setFieldTouched("status", true)}
              status={
                formik.touched.status && formik.errors.status ? "error" : ""
              }
              className="w-full"
              options={statusOptions}
            />
            {formik.touched.status && formik.errors.status && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.status}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Due date</label>
            <DatePicker
              className="w-full"
              format="MMM D, YYYY"
              value={formik.values.dueDate}
              onChange={(date) => formik.setFieldValue("dueDate", date)}
              onBlur={() => formik.setFieldTouched("dueDate", true)}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
              status={
                formik.touched.dueDate && formik.errors.dueDate ? "error" : ""
              }
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.dueDate}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Open tickets
            </label>
            <InputNumber
              className="w-full"
              min={0}
              max={500}
              value={formik.values.tickets}
              onChange={(value) => formik.setFieldValue("tickets", value ?? 0)}
              onBlur={() => formik.setFieldTouched("tickets", true)}
              status={
                formik.touched.tickets && formik.errors.tickets ? "error" : ""
              }
            />
            {formik.touched.tickets && formik.errors.tickets && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.tickets}
              </div>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

