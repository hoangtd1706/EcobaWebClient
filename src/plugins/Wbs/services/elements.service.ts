import {
  axiosClient,
  URI_ELEMENTS,
  URI_ELEMENT_APPROVE_CONFIRM_REQUEST,
  URI_ELEMENT_UPDATE,
  URI_ELEMENT_UPDATE_CONFIRM_REQUEST,
  URI_ELEMENT_NETWORK_CONFIRM_FINISH,
  URI_ELEMENT_REMOVE_CHILDREN,
  URI_ELEMENT_REMOVE_NETWORK,
  URI_ELEMENT_REMOVE_NETWORK_CONFIRM_REQUEST,
} from "./client.service";

export type ElementModel = {
  elementCode: string;
  elementName: string;
  isLeaf: boolean;
  waitToApprove: number;
  waitToFinish: number;
  totalNetworks: number;
  finishedNetworks: number;
  breadcrumbs: {
    elementName: string;
    elementCode: string;
    level: number;
  }[];
  children: {
    elementCode: string;
    elementName: string;
    isLeaf: boolean;
    waitToApprove: number;
    waitToFinish: number;
    finishedNetworks: number;
    totalNetworks: number;
    children: string[];
    networks: string[];
  }[];
  networks: {
    networkCode: string;
    networkName: string;
    activityFilter: string;
    isFinish: boolean;
    requestValue: number;
    approvedValue: number;
  }[];
};

function getProjectDetail(
  projectCode: string,
  elementCode: string
): Promise<ElementModel> {
  return axiosClient
    .get(URI_ELEMENTS(projectCode, elementCode), {
      data: {
        projectCode: projectCode,
        elementCode: elementCode,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

function updateElement(
  projectCode: string,
  elementCode: string,
  elementName: string
) {
  return axiosClient
    .put(URI_ELEMENT_UPDATE(projectCode, projectCode), {
      elementCode: elementCode,
      elementName: elementName,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

function UpdateConfirmRequest(
  projectCode: string,
  elementCode: string,
  networkCode: string,
  value: number
) {
  return axiosClient
    .put(
      URI_ELEMENT_UPDATE_CONFIRM_REQUEST(projectCode, elementCode, networkCode),
      {
        requestDate: Date.now,
        value: value,
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

function ApproveConfirmRequest(
  projectCode: string,
  elementCode: string,
  networkCode: string
) {
  return axiosClient
    .put(
      URI_ELEMENT_APPROVE_CONFIRM_REQUEST(
        projectCode,
        elementCode,
        networkCode
      ),
      {
        approvedDate: Date.now,
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

function ConfirmFinishNetwork(
  projectCode: string,
  elementCode: string,
  networkCode: string
) {
  return axiosClient
    .put(
      URI_ELEMENT_NETWORK_CONFIRM_FINISH(projectCode, elementCode, networkCode),
      {
        finishDate: Date.now,
      }
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

function RemoveChildren(projectCode: string, elementCode: string) {
  return axiosClient
    .delete(URI_ELEMENT_REMOVE_CHILDREN(projectCode, elementCode), {
      data: {
        elementCode: elementCode,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

function RemoveNetworks(
  projectCode: string,
  elementCode: string,
  networkCode: string
) {
  return axiosClient
    .delete(URI_ELEMENT_REMOVE_NETWORK(projectCode, elementCode, networkCode), {
      data: {
        networkCode: networkCode,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

function RemoveConfirmRequest(
  projectCode: string,
  elementCode: string,
  networkCode: string
) {
  return axiosClient
    .delete(
      URI_ELEMENT_REMOVE_NETWORK_CONFIRM_REQUEST(
        projectCode,
        elementCode,
        networkCode
      )
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export const elementService = {
  getProjectDetail,
  updateElement,
  UpdateConfirmRequest,
  ApproveConfirmRequest,
  ConfirmFinishNetwork,
  RemoveChildren,
  RemoveNetworks,
  RemoveConfirmRequest,
};
