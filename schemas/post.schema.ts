import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  campaign_name: yup.string().required("Campaign Name is required"),
  year_salary: yup.string().required("Year Salary is required").typeError("Year Salary should be a number type"),
  location: yup.string().required("Location is required"),
  description: yup.string().required("Description is required"),
  employment: yup.string().required("Employment is required"),
});
