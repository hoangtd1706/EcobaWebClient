import { axiosClient } from "../client.service";
import {
  IComponent,
  IComponents,
  URI_COMPONENTS,
  URI_COMPONENT_UPDATE_ACTIVITY,
  URI_GET_COMPONENT,
} from "./constant";

function getAllComponents(projectCode: string): Promise<IComponents[]> {
  return axiosClient
    .get(URI_COMPONENTS(projectCode))
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

function getComponent(
  projectCode: string,
  componentCode: string
): Promise<IComponent> {
  return axiosClient
    .get(URI_GET_COMPONENT(projectCode, componentCode))
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export const componentService = {
  getAllComponents,
  getComponent,
};
