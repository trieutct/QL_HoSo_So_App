import { defineStore } from "pinia";
import { ref } from "vue";

export const useDocStore = defineStore("useDocStore", () => {
  const isShowPopup = ref<boolean>(true);

  function setIsShowPopup(value: boolean) {
    isShowPopup.value = value;
  }
  return {
    isShowPopup,
    setIsShowPopup,
  };
});
