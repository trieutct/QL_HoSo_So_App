// import { ToastType, useToasts } from '@/components/toast/store';
import dayjs from '../../plugins/dayjs/index';
// import i18n from '../plugins/vue-i18n';
import {
  DEFAULT_FIRST_PAGE,
  DEFAULT_LIMIT_FOR_PAGINATION,
  OrderDirection,
} from '../contants/contants';
import { type IOption, type IOrderDirection } from '../interface/interfaces';
import { ElNotification } from 'element-plus'
export function isValidJSON(str: string) {
  try {
    const object = JSON.parse(str);
    if (object && typeof object === 'object') return true;
    return false;
  } catch (error) {
    return false;
  }
}

// export function translateYupError(
//   yupError:
//     | {
//         i18nKey: string;
//         params?: Record<string, string>;
//       }
//     | string,
// ): string {
//   if (typeof yupError === 'string') {
//     return i18n.global.t(yupError);
//   }
//   if (!yupError?.i18nKey) return '';
//   return i18n.global.t(yupError?.i18nKey, { ...yupError?.params });
// }

export function isStringify<T>(obj: T | Record<string, unknown>): boolean {
  try {
    JSON.stringify(obj);
  } catch (e) {
    return false;
  }
  return true;
}

export function showErrorNotification(message: string) {
  if (!message) return;
  ElNotification({
    title: 'Thông báo',
    message: message,
    type: 'error',
  })
}

export function showSuccessNotification(message: string) {
  if (!message) return;
  ElNotification({
    title: 'Thông báo',
    message: message,
    type: 'success',
  })
}

export function showWarningsNotification(message: string) {
  if (!message) return;
  ElNotification({
    title: 'Thông báo',
    message: message,
    type: 'warning',
  })
}

export function maskPhone(value: string, pattern = '### #### ###') {
  let i = 0;
  return pattern.replace(/#/g, (_) => value[i++]);
}

// export function formatDate(date: Date | string) {
//   return dayjs(date).format(DATE_TIME_FORMAT.YYYY_MM_DD_DASH);
// }

export const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ|Đ/g, 'd');
};

export const getToggleOrderDirection = (orderDirection: IOrderDirection | string) => {
  switch (orderDirection) {
    case undefined:
      return OrderDirection.DESC;
    case OrderDirection.ASC:
      return OrderDirection.DESC;
    case OrderDirection.DESC:
      return OrderDirection.ASC;
    default:
      break;
  }
};

export const getTableIndex = (index: number, page?: number, limit?: number) => {
  return (
    ((page || DEFAULT_FIRST_PAGE) - 1) * (limit || DEFAULT_LIMIT_FOR_PAGINATION) +
    index +
    1
  );
};

export const convertToOptionItem = (item: any, withCode?: boolean) => {
  return {
    title: (item?.name || '') + (withCode && item?.code ? ` (${item.code})` : ''),
    value: item?.id || item?._id,
    other: item,
  };
};

export const convertToOptions = (data: any[], withCode?: boolean): IOption[] => {
  return data.map((item) => convertToOptionItem(item, withCode));
};

export const compareFormData = (
  formData: any,
  originalData: any,
  exclude?: string[],
): boolean => {
  if (exclude) {
    const _formData = { ...formData };
    const _originalData = { ...originalData };
    exclude.forEach((field) => {
      delete _formData?.[field];
      delete _originalData?.[field];
    });
    return JSON.stringify(_formData) === JSON.stringify(_originalData);
  }
  return JSON.stringify(formData) === JSON.stringify(originalData);
};

export const getDiffFormData = (
  oldForm: Record<string, unknown>,
  newForm: Record<string, unknown>,
  fields?: string[], //If the data are constrained to each other, then taking all
) => {
  const differences = {} as Record<string, unknown>;
  for (const key in oldForm) {
    if (JSON.stringify(oldForm[key]) !== JSON.stringify(newForm[key])) {
      differences[key] = newForm[key];
    }
  }
  if (fields?.length) {
    let isInGroup = false;
    for (const key of fields) {
      if (differences[key]) {
        isInGroup = true;
        break;
      }
    }
    if (isInGroup) {
      const groupDifferences = Object.fromEntries(
        fields.map((key) => [key, newForm[key]]),
      );
      Object.assign(differences, groupDifferences);
    }
  }
  return differences;
};

export const formatDateString = (ds: string, format: string): string => {
  return dayjs(ds).format(format);
};export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length === 10) {
      return `${cleaned.substr(0, 3)}-${cleaned.substr(3, 3)}-${cleaned.substr(6)}`;
  } else {
      return phoneNumber;
  }
};
export const removeEmptyValue = (arrays: any[]) => {
  const result: any[] = [];
  arrays?.forEach((item) => {
    if (item) {
      result.push(item);
    }
  });
  return result.length ? result : undefined;
};

export const scrollToIdElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const formatNumberWithCommas=(value:string)=> {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const checkSearchEnter = (str:string) => {
  const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  return regex.test(str);
};
export const checkSearchUserEnter = (str: string) => {
  const regex = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
  return regex.test(str);
};

