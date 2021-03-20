import { IHttpPresentation } from '../types/presentation';

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

  return container;
}
