import { useField, useForm } from "vee-validate";
import { loginWithPasswordSchema } from "../schema";
import { computed } from "vue";
export const userLoginForm = () => {
  const {
    handleSubmit,
    values: formValue,
    setValues,
    meta,
    validate,
  } = useForm({
    validationSchema: loginWithPasswordSchema,
  });

  const {
    value: email,
    setValue: setEmail,
    errorMessage: emailError,
  } = useField("email");
  const {
    value: password,
    setValue: setPassword,
    errorMessage: passwordError,
  } = useField("password");

  const handleLogin = handleSubmit(async (values) => {
    alert(values.email);
  });

  const isValidForm = computed(() => meta.value.valid);
  return {
    handleLogin,
    formValue,
    isValidForm,
    validate,
    setValues,
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
  };
};
