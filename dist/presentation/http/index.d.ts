import { IHttpPresentation } from '../../types/presentation';
import { Container } from '../../types/core';
declare type Config = {
    env: typeof import('../../util/env').env;
    coreContainer: Container;
};
export declare class HttpPresentation implements IHttpPresentation {
    private env;
    private coreContainer;
    private app;
    constructor(config: Config);
    initApp(): void;
    serve(): void;
}
export {};
