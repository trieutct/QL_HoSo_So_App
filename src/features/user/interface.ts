import * as yup from "yup";
import {
  FORM_VALIDATION,
  MESSAGE_ERROR,
  Regex,
} from "../../common/contants/contants";
export interface ISelectOption {
  value: string;
  text: string;
}
export interface IUser {
  id: string;
  fullName: string;
  password: string;
  email: string;
  birthday: string;
  phone: string;
  imageUrl: string;
  roleId: string;
}
const passwordSchema = yup
  .string()
  .required(MESSAGE_ERROR.REQUIRE)
  .min(FORM_VALIDATION.passwordMinLength, MESSAGE_ERROR.MINLEGHT_PASSWORD)
  .max(FORM_VALIDATION.textMaxLength, MESSAGE_ERROR.MAXLEGHT_PASSWORD);
export const changePassword = yup.object({
  oldpassword: passwordSchema.matches(
    Regex.PASSWORD,
    MESSAGE_ERROR.REGEX_PASSWORD
  ),
  newpassword: passwordSchema.matches(
    Regex.PASSWORD,
    MESSAGE_ERROR.REGEX_PASSWORD
  ),
  cfpassword: passwordSchema
    .matches(Regex.PASSWORD, MESSAGE_ERROR.REGEX_PASSWORD)
    .oneOf([yup.ref("newpassword")], MESSAGE_ERROR.PASSWORD_MATCH),
});
