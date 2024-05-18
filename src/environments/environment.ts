interface IWindowEnvironment {
  HOST_3000: string;
  HOST_3001: string;
  HOST_3002: string;
  HOST_3003: string;
  HOST_81: string;
  KEY_EMAIL: string;
}

declare global {
  interface Window {
    _env: IWindowEnvironment;
  }
}

export const environment = {
  HOST_3000: window._env.HOST_3000,
  HOST_3001: window._env.HOST_3001,
  HOST_3002: window._env.HOST_3002,
  HOST_3003: window._env.HOST_3003,
  HOST_81: window._env.HOST_81,
  KEY_EMAIL: window._env.KEY_EMAIL,
  production: false,
};
