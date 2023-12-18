import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  username: yup.string().min(3, 'The minimum value is 3 characters').required("Username is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});
