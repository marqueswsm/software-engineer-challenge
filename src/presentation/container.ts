import { createCoreContainer } from '../core/container';
import { HttpPresentation } from './http';
import { createInfraContainer } from '../infrastructure/container';

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

  const infraContainer = createInfraContainer();
  const coreContainer = createCoreContainer(infraContainer);

  if (config.init.http) {
    container.httpPresentation = new HttpPresentation({
      env: config.env,
      coreContainer,
    });
  }

  return container;
}
