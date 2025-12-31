import { DatePicker, Input, InputNumber, Select } from "antd";
import { Modal, FormField } from "@components/ui";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { FormValidator, FormInitials, type ProjectFormInitialValues } from "@utils";
import { useProjectsContext } from "../context/ProjectsContext";
import { useEffect } from "react";
import type { ProjectRecord } from "@/types";

export type ProjectFormValues = ProjectFormInitialValues;

type ProjectFormModalProps = {
  className?: string;
};

const STATUS_OPTIONS = [
  { label: "In Progress", value: "In Progress" },
  { label: "On Hold", value: "On Hold" },
  { label: "Completed", value: "Completed" },
  { label: "Blocked", value: "Blocked" },
];

export const ProjectFormModal = ({
  className,
}: ProjectFormModalProps = {}) => {
  const {
    isFormOpen,
    formMode,
    selectedProject,
    handleFormSubmit,
    isFormLoading,
    closeForm,
  } = useProjectsContext();

  const isOpen = isFormOpen && (formMode === "create" || formMode === "edit");
  const isEditMode = formMode === "edit";

  const formik = useFormik<ProjectFormValues>({
    initialValues: isEditMode && selectedProject
      ? {
          ...FormInitials.projectFormInitials(selectedProject),
          dueDate: dayjs(selectedProject.dueDate, "MMM D, YYYY"),
        }
      : FormInitials.projectFormInitials(),
    validationSchema: FormValidator.projectFormValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await handleFormSubmit(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && selectedProject) {
        formik.setValues({
          ...FormInitials.projectFormInitials(selectedProject),
          dueDate: dayjs(selectedProject.dueDate, "MMM D, YYYY"),
        });
      } else {
        formik.setValues(FormInitials.projectFormInitials());
      }
    }
  }, [isOpen, isEditMode, selectedProject]);

  const handleOk = async () => {
    await formik.submitForm();
  };

  const handleCancel = () => {
    formik.resetForm();
    closeForm();
  };

  return (
    <Modal
      open={isOpen}
      title={isEditMode ? "Edit project" : "Create new project"}
      onCancel={handleCancel}
      onOk={handleOk}
      okText={isEditMode ? "Save changes" : "Create"}
      confirmLoading={isFormLoading}
      className={className}
      afterClose={() => {
        formik.resetForm();
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <FormField
            label="Project name"
            error={formik.errors.name}
            touched={formik.touched.name}
          >
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
          </FormField>

          <FormField
            label="Project code"
            error={formik.errors.projectCode}
            touched={formik.touched.projectCode}
          >
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
          </FormField>

          <FormField
            label="Owner"
            error={formik.errors.owner}
            touched={formik.touched.owner}
          >
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
          </FormField>

          <FormField
            label="Status"
            error={formik.errors.status}
            touched={formik.touched.status}
          >
            <Select
              value={formik.values.status}
              onChange={(value) => formik.setFieldValue("status", value)}
              onBlur={() => formik.setFieldTouched("status", true)}
              status={
                formik.touched.status && formik.errors.status ? "error" : ""
              }
              className="w-full"
              options={STATUS_OPTIONS}
            />
          </FormField>

          <FormField
            label="Due date"
            error={formik.errors.dueDate}
            touched={formik.touched.dueDate}
          >
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
          </FormField>

          <FormField
            label="Open tickets"
            error={formik.errors.tickets}
            touched={formik.touched.tickets}
          >
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
          </FormField>
        </div>
      </form>
    </Modal>
  );
};

