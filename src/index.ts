import { env } from './util/env';
export default class App {
  private http: boolean;

  constructor({ http }) {
    this.http = http;
  }

  run() {
    console.log('It is working')
  }
}

const app = new App({
  http: env.httpActive,
});

setImmediate(() => {
  app.run();
})