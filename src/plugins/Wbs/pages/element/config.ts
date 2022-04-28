import styled from "styled-components";

type ElementStyleProps = {
  status: any;
};

export const ElementStyle = styled.div<ElementStyleProps>`
  ${({ status }) =>
    status == "notStart"
      ? "background:#fff;"
      : status == "process"
      ? "background:#ffee2565;"
      : "background:#a3d7ff65;"}
  border: 0.5px solid;
  ${({ status }) =>
    status == "notStart"
      ? "border-color:#fff;"
      : status == "process"
      ? "border-color:#f8b01f;"
      : "border-color:#a3d7ff;"}
  border-radius: 3px;
  padding: 10px;
  cursor: pointer;
`;

const getStatusNetwork = (
  isFinish: boolean,
  approvedValue: number,
  requestValue: number
) => {
  if (isFinish) return "finish";
  if (approvedValue > 0 || requestValue > 0) return "process";
  if (approvedValue == 0 && requestValue == 0) return "notStart";
};

const getStatusElement = (
  isFinish: boolean,
  waitToApprove: number,
  waitToFinish: number
) => {
  if (isFinish) return "finish";
  if (waitToApprove > 0 || waitToFinish > 0) return "process";
  if (waitToApprove == 0 && waitToFinish == 0 && isFinish == false)
    return "notStart";
};

export const configElement = {
  getStatusNetwork,
  getStatusElement,
};
