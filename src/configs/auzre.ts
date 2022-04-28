import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "0f297dc1-bee5-4c1f-92a6-043286710fd1",
    authority:
      "https://login.microsoftonline.com/2b5438a9-6a60-437b-afb7-2cc6fd444d86",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any): any => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
