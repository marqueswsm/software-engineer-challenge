import { IHttpPresentation } from '../types/presentation';
import { HttpPresentation } from './http';

type ContainerConfig = {
  env: any;
  init: {
    http?: boolean;
  };
};

type Container = {
  httpPresentation?: IHttpPresentation;
};

// eslint-disable-next-line no-unused-vars
export default function createContainer(config: ContainerConfig): Container {
  const container: Container = {};

  if (config.init.http) {
    container.httpPresentation = new HttpPresentation({
      env: config.env,
    });
  }

  return container;
}
