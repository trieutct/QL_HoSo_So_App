import { useField, useForm } from "vee-validate";
import { loginWithPasswordSchema } from "../schema";
import { computed } from "vue";
import { AuthStore } from "../store/auth.store";
import router from "../../../plugins/vue-router";
import { PageName } from "../../../common/contants/contants";
import { useLoadingStore } from "../../loading/store";
import { showSuccessNotification } from "../../../common/helper/helpers";
export const userLoginForm = () => {
  const authStore = AuthStore();
  const loading = useLoadingStore();
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
    // alert(values.email);
    loading.setLoading(true);
    const res = await authStore.login({
      email: values.email,
      password: values.password,
    });
    loading.setLoading(false);
    if (res) {
      showSuccessNotification("Đăng nhập thành công");
      router.push({ name: PageName.DASHBOARD_PAGE });
    }
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
