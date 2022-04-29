export const URI_COMPONENTS = (projectCode: string): string =>
  `/projects/${projectCode}/components`;
export const URI_COMPONENTS_CREATE = (projectCode: string): string =>
  `/projects/${projectCode}/components`;
export const URI_GET_COMPONENT = (
  projectCode: string,
  componentCode: string
): string => `/projects/${projectCode}/components/${componentCode}`;
/* Update */
export const URI_COMPONENT_UPDATE_MAPPING = (
  projectCode: string,
  componentCode: string
): string =>
  `/projects/${projectCode}/components/${componentCode}/update-mappings`;
export const URI_COMPONENT_UPDATE_ACTIVITY = (
  projectCode: string,
  componentCode: string
): string =>
  `/projects/${projectCode}/components/${componentCode}/update-activities`;
export const URI_COMPONENT_UPDATE_PART = (
  projectCode: string,
  componentCode: string
): string =>
  `/projects/${projectCode}/components/${componentCode}/update-parts`;
export const URI_COMPONENT_UPDATE_PART_PARAMETER = (
  projectCode: string,
  componentCode: string,
  partCode: string
): string =>
  `/projects/${projectCode}/components/${componentCode}/parts/${partCode}/update-parameters`;
export const URI_COMPONENT_UPDATE_PART_ACTIVITY = (
  projectCode: string,
  componentCode: string,
  partCode: string
): string =>
  `/projects/${projectCode}/components/${componentCode}/parts/${partCode}/update-activities`;

export interface IComponents {
  componentCode: string;
  componentName: string;
  totalQuantity: number;
}

export interface IComponent {
  componentCode: string;
  componentName: string;
  totalQuantity: number;
  projectCode: string;
  parts: {
    partCode: string;
    partName: string;
    quantity: number;
    projectCode: string;
    parameters: {
      parameterCode: string;
      formula: string;
      value: number;
      parameterType: string;
      projectCode: string;
    }[];
  }[];
  mappings: IMapping[];
}

export interface IPart {
  partCode: string;
  partName: string;
  quantity: number;
  projectCode: string;
  parameters: {
    parameterCode: string;
    formula: string;
    value: number;
    parameterType: string;
    projectCode: string;
  }[];
  activities: {
    activityCode: string;
    formula: string;
    value: number;
    projectCode: string;
  }[];
}

export interface IMapping {
  componentCode: string;
  elementCode: string;
  quantity: number;
  component: string;
  element: {
    elementCode: string;
    elementName: string;
    level: number;
    isLeaf: boolean;
    networks: null;
    children: null;
    mappings: null;
    projectCode: string;
  };
  projectCode: string;
}
