import { ref } from "vue";
import { DEFAULT_COMMON_LIST_QUERY } from "../../common/contants/contants";
import { IUser, changePassword } from "./interface";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../common/helper/helpers";
import { useLoadingTableStore } from "../loading/store/loading_table";
import { userServiceApi } from "./service/user.service";
import { useField, useForm } from "vee-validate";
import { authServiceApi } from "../auth/services/auth.service";

export const useUser = () => {
  const loading = useLoadingTableStore();
  const users = ref<IUser[]>([]);
  const query = DEFAULT_COMMON_LIST_QUERY;
  const getDataUsers = async () => {
    try {
      const res = await userServiceApi._getList<IUser>(query);
      loading.setLoading(true);
      if (res.success)
        return {
          data: res.data.items,
          totalItems: res.data.totalItems,
        };
      else {
        showErrorNotification(res.message);
        return null;
      }
    } catch (error) {
      console.error("Error getDataUsers kho.ts:", error);
      return null;
    } finally {
      loading.setLoading(false);
    }
  };

  const {
    handleSubmit,
    values: formValue,
    setValues,
    meta,
    validate,
    resetForm,
  } = useForm({
    validationSchema: changePassword,
  });
  const {
    value: oldpassword,
    setValue: setOldPassword,
    errorMessage: oldPasswordError,
  } = useField("oldpassword");
  const {
    value: newpassword,
    setValue: setNewPassword,
    errorMessage: newPasswordError,
  } = useField("newpassword");
  const {
    value: cfpassword,
    setValue: cfsetPassword,
    errorMessage: cfpasswordError,
  } = useField("cfpassword");

  const submit = handleSubmit(async (values) => {
    const res = await authServiceApi.changePassword({
      newPassword: values.newpassword,
      oldPassword: values.oldpassword,
    });
    if (res.success) {
      showSuccessNotification(res.message);
      resetForm();
    } else {
      showErrorNotification(res.message);
    }
  });
  return {
    users,
    query,
    getDataUsers,
    handleSubmit,
    formValue,
    setValues,
    meta,
    validate,
    newpassword,
    setNewPassword,
    newPasswordError,
    cfpassword,
    cfsetPassword,
    cfpasswordError,
    oldPasswordError,
    setOldPassword,
    oldpassword,
    submit,
    resetForm,
  };
};
