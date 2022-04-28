export type dataProject = {
  breadcrumbs: {
    text: string;
    code: string;
    level: number;
  }[];
  children: {
    isLeaf: boolean;
    versionNumber: number;
    code: string;
    level: number;
    description: string;
    start: string;
    finish: string;
    projectCode: string;
  }[];
  versionNumber: number;
  code: string;
  level: number;
  description: string;
  start: string;
  finish: string;
  projectCode: string;
};

export const data: dataProject = {
  breadcrumbs: [
    {
      text: "DA VOV Mễ Trì",
      code: "1.00072",
      level: 1,
    },
    {
      text: "Xây dựng",
      code: "1.00072.C",
      level: 2,
    },
  ],
  children: [
    {
      isLeaf: false,
      versionNumber: -1,
      code: "1.00072.C",
      level: 2,
      description: "Xây dựng",
      start: "2022-02-18T00:00:00",
      finish: "2023-04-20T00:00:00",
      projectCode: "1.00072",
    },
    {
      isLeaf: false,
      versionNumber: -1,
      code: "1.00072.D",
      level: 3,
      description: "Giàn",
      start: "2023-02-28T00:00:00",
      finish: "2023-05-18T00:00:00",
      projectCode: "1.00072",
    },
  ],
  versionNumber: -1,
  code: "1.00072",
  level: 1,
  description: "DA VOV Mễ Trì",
  start: "2022-02-18T00:00:00",
  finish: "2023-04-29T00:00:00",
  projectCode: "1.00072",
};

export interface IProjects {
  elementCode: string;
  elementName: string;
  waitToApprove: number;
  waitToFinish: number;
  isLeaf: boolean;
}

export const projects: IProjects[] = [
  {
    elementCode: "1.20001",
    elementName: "Dự án Test",
    isLeaf: false,
    waitToApprove: 2,
    waitToFinish: 2,
  },
  {
    elementCode: "1.20002",
    elementName: "Dự án Test 2",
    isLeaf: false,
    waitToApprove: 2,
    waitToFinish: 2,
  },
];
