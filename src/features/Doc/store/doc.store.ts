import { defineStore } from "pinia";
import { ref } from "vue";
import { docServiceApi } from "../service/doc.service";
import { showErrorNotification } from "../../../common/helper/helpers";
interface IDoc {
  id: string;
  docCode: string;
  docOrdinal: string;
  codeNumber: string;
  codeNotation: string;
  issuedDate: string;
  organName: string;
  subject: string;
  pageAmount: string;
  note: string;
  keyword: string;
  urlFile: string;
  fileCode: string;
  loaiVanBanId: number;
}
export const useDocStore = defineStore("useDocStore", () => {
  const listDocs = ref<IDoc[]>([]);
  const isShowPopup = ref<boolean>(false);
  const hosoId = ref<string | number>("");
  //mã fileCode của hồ sơ để lấy danh sách DOC
  const fileCode = ref<string>("");
  const selectedDocId = ref<string>();

  async function fetchData(maHoSo: string) {
    const res = await docServiceApi.getAllDocByFileCode(maHoSo as string);
    if (res.success) {
      listDocs.value = res.data;
    } else {
      showErrorNotification(res.message);
    }
  }
  function setIsShowPopup(value: boolean) {
    isShowPopup.value = value;
  }
  function setHosoId(value: string | number) {
    hosoId.value = value;
  }
  function setFileCode(value: string) {
    fileCode.value = value;
  }
  function setSelectedDocId(value: string) {
    selectedDocId.value = value;
  }
  return {
    isShowPopup,
    setIsShowPopup,
    hosoId,
    setHosoId,
    fileCode,
    setFileCode,
    listDocs,
    setSelectedDocId,
    fetchData,
    selectedDocId,
  };
});
