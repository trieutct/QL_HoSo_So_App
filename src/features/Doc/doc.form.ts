import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { MESSAGE_ERROR } from "../../common/contants/contants";
import { useDocStore } from "./store/doc.store";
import { docServiceApi } from "./service/doc.service";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../common/helper/helpers";
export const initDoc = {
  docCode: "",
  codeNumber: "",
  codeNotation: "",
  issuedDate: "",
  organName: "",
  subject: "",
  note: "",
  keyword: "",
  FileCode: "",
  LoaiVanBanId: "",
  file: null as any,
};
export const schema = yup.object({
  docCode: yup.string().required(MESSAGE_ERROR.REQUIRE),
  codeNumber: yup.string().optional().nullable(),
  codeNotation: yup.string().optional().nullable(),
  issuedDate: yup.string().required(MESSAGE_ERROR.REQUIRE),
  organName: yup.string().required(MESSAGE_ERROR.REQUIRE),
  subject: yup.string().required(MESSAGE_ERROR.REQUIRE),
  note: yup.string().optional().nullable(),
  keyword: yup.string().optional().nullable(),
  FileCode: yup.string().required(MESSAGE_ERROR.REQUIRE),
  LoaiVanBanId: yup.string().required(MESSAGE_ERROR.REQUIRE),
  file: yup.mixed().required("Vui lòng chọn file"),
});

export const UseDocForm = () => {
  const docStore = useDocStore();
  const {
    handleSubmit,
    values: formValue,
    setValues,
    meta,
    validate,
    errors,
    resetForm,
  } = useForm({
    initialValues: initDoc,
    validationSchema: schema,
  });
  const { value: docCode, errorMessage: docCodeErro } = useField("docCode");
  const { value: codeNumber, errorMessage: codeNumberErro } =
    useField("codeNumber");
  const { value: codeNotation, errorMessage: codeNotationErro } =
    useField("codeNotation");
  const { value: issuedDate, errorMessage: issuedDateErro } =
    useField("issuedDate");
  const { value: organName, errorMessage: organNameErro } =
    useField("organName");
  const { value: subject, errorMessage: subjectErro } = useField("subject");
  const { value: note, errorMessage: noteErro } = useField("note");
  const { value: keyword, errorMessage: keywordErro } = useField("keyword");
  const {
    value: FileCode,
    setValue: setFileCode,
    errorMessage: FileCodeErro,
  } = useField("FileCode");
  const { value: LoaiVanBanId, errorMessage: LoaiVanBanIdErro } =
    useField("LoaiVanBanId");
  const { value: file, errorMessage: fileErro } = useField("file");

  const handle = handleSubmit(async (values) => {
    const formData = new FormData();
    formData.append("Id", docStore.selectedDocId ? docStore.selectedDocId : "");
    formData.append("codeNotation", values.codeNotation);
    formData.append("codeNumber", values.codeNumber);
    formData.append("docCode", values.docCode);
    formData.append("FileCode", values.FileCode);
    formData.append("issuedDate", values.issuedDate);
    formData.append("keyword", values.keyword);
    formData.append("LoaiVanBanId", values.LoaiVanBanId);
    formData.append("note", values.note);
    formData.append("organName", values.organName);
    formData.append("subject", values.subject);
    formData.append("file", values.file.raw);
    const res = docStore.selectedDocId
      ? await docServiceApi.update(docStore.selectedDocId, formData)
      : await docServiceApi.create(formData);
    if (res.success) {
      showSuccessNotification(res.message);
      docStore.setIsShowPopup(false);
      docStore.fetchData(docStore.fileCode as string);
    } else {
      showErrorNotification(res.message);
    }
  });

  return {
    handleSubmit,
    formValue,
    setValues,
    meta,
    validate,
    errors,
    handle,
    docCode,
    LoaiVanBanId,
    FileCode,
    keyword,
    note,
    subject,
    organName,
    issuedDate,
    codeNotation,
    codeNumber,
    file,
    setFileCode,
    LoaiVanBanIdErro,
    FileCodeErro,
    keywordErro,
    noteErro,
    subjectErro,
    organNameErro,
    issuedDateErro,
    codeNotationErro,
    codeNumberErro,
    docCodeErro,
    fileErro,

    resetForm,
  };
};
