import * as Yup from "yup";

export default class FormValidator {
  static get projectFormValidationSchema() {
    return Yup.object({
      name: Yup.string()
        .trim()
        .required("Please enter a project name")
        .min(3, "Project name must be at least 3 characters long"),
      projectCode: Yup.string()
        .trim()
        .required("Please enter a project code")
        .matches(/^PRJ-\d{3}$/i, "Project code must match the pattern PRJ-123"),
      owner: Yup.string()
        .trim()
        .required("Please specify an owner")
        .min(3, "Owner name must be at least 3 characters long"),
      status: Yup.string()
        .oneOf(
          ["In Progress", "On Hold", "Completed", "Blocked"],
          "Select the current project status"
        )
        .required("Select the current project status"),
      dueDate: Yup.mixed()
        .required("Select the next milestone date")
        .test("not-past", "Due date cannot be in the past", function (value) {
          if (!value) return false;
          // Handle Dayjs objects
          if (
            value &&
            typeof value === "object" &&
            "isBefore" in value &&
            typeof value.isBefore === "function" &&
            "startOf" in value &&
            typeof value.startOf === "function"
          ) {
            const dayjsValue = value as {
              isBefore: (date: any, unit?: string) => boolean;
              startOf: (unit: string) => any;
            };
            const today = dayjsValue.startOf("day");
            return !dayjsValue.isBefore(today, "day");
          }
          // Handle Date objects or date strings
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          let dateValue: Date;
          if (value instanceof Date) {
            dateValue = value;
          } else if (typeof value === "string" || typeof value === "number") {
            dateValue = new Date(value);
          } else {
            return false;
          }
          return dateValue >= today;
        }),
      tickets: Yup.number()
        .typeError("Tickets must be a number")
        .min(0, "Tickets must be at least 0")
        .max(500, "Tickets must be at most 500")
        .required("Tickets is required"),
    });
  }
}
