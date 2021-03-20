import { env } from './util/env';

export default class App {
  private http: boolean;

  constructor({ http }) {
    this.http = http;
  }

  // eslint-disable-next-line class-methods-use-this
  run() {}
}

const app = new App({
  http: env.httpActive,
});

setImmediate(() => {
  app.run();
});
