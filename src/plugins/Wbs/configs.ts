import { PluginModel, MenuModel } from "../../core/types";

export const checkPermission = (): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    resolve(true);
  });
};

export const checkAdmin = (): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    resolve(false);
  });
};

export const plugin: PluginModel = {
  id: 2,
  routeOrder: 9999,
  text: "iQS",
  icon: "home",
  link: "/project-system",
  route: "/project-system",
};

export const menuList: MenuModel[] = [
  {
    text: "Kế hoạch",
    items: [
      {
        text: "WBS",
        color: "primary",
        icon: { iconName: "lightbulb", prefix: "far" },
        link: "/project-system/elements",
      },
      {
        text: "Cấu kiện điển hình",
        color: "primary",
        icon: { iconName: "lightbulb", prefix: "far" },
        link: "/project-system/components",
      },
    ],
  },
];

export const adminMenuList: MenuModel[] = [];
