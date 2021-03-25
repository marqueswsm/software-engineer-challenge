import { IHttpPresentation } from '../types/presentation';
declare type ContainerConfig = {
    env: any;
    init: {
        http?: boolean;
    };
};
declare type Container = {
    httpPresentation?: IHttpPresentation;
};
export default function createContainer(config: ContainerConfig): Container;
export {};
