import {Router} from '@vaadin/router';

let routerInstance: Router;

export const connectUrlGeneratorWithRouter = (router: Router): void => {
  routerInstance = router;
};

const getRouter = (): Router => {
  if (!routerInstance) {
    throw new Error('Router instance should be connected during installation');
  }

  return routerInstance;
};

export const generateUrl = (params?: Record<string, string>): string => {
  return getRouter().location.getUrl(params);
};

/**
 * Will generate path and fulfill params placeholders if necessary
 * @param path {string} - relative path to baseUrl
 * @param params {object}
 * @return string
 */
export const generateUrlByPath = (path: string, params: Record<string, string> = {}): string => {
  return getRouter().urlForPath(path, params);
};

export const generateUrlByNameOrComponentName = (
  nameOrComponent: string,
  params: Record<string, string> = {},
): string => {
  return getRouter().urlForName(nameOrComponent, params);
};
