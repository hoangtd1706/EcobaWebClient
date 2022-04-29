export const URI_ELEMENTS = (
  projectCode: string,
  elementCode: string
): string => `/projects/${projectCode}/elements/${elementCode}`;
export const URI_ELEMENT_UPDATE = (
  projectCode: string,
  elementCode: string
): string => `/projects/${projectCode}/elements/${elementCode}/update-children`;
export const URI_ELEMENT_UPDATE_CONFIRM_REQUEST = (
  projectCode: string,
  elementCode: string,
  networkCode: string
): string =>
  `/projects/${projectCode}/elements/${elementCode}/networks/${networkCode}/update-confirm-request`;

export const URI_ELEMENT_APPROVE_CONFIRM_REQUEST = (
  projectCode: string,
  elementCode: string,
  networkCode: string
): string =>
  `/projects/${projectCode}/elements/${elementCode}/networks/${networkCode}/approve-confirm-request`;

export const URI_ELEMENT_NETWORK_CONFIRM_FINISH = (
  projectCode: string,
  elementCode: string,
  networkCode: string
): string =>
  `/projects/${projectCode}/elements/${elementCode}/networks/${networkCode}/finish`;

export const URI_ELEMENT_REMOVE_CHILDREN = (
  projectCode: string,
  elementCode: string
): string => `/projects/${projectCode}/elements/${elementCode}/remove-children`;

export const URI_ELEMENT_REMOVE_NETWORK = (
  projectCode: string,
  elementCode: string,
  networkCode: string
): string =>
  `/projects/${projectCode}/elements/${elementCode}/networks/${networkCode}/remove-networks`;

export const URI_ELEMENT_REMOVE_NETWORK_CONFIRM_REQUEST = (
  projectCode: string,
  elementCode: string,
  networkCode: string
): string =>
  `/projects/${projectCode}/elements/${elementCode}/networks/${networkCode}/remove-confirm-request`;
