import { env } from './util/env';
import createContainer from './presentation/container';

export default class App {
  private http: boolean;

  constructor({ http }) {
    this.http = http;
  }

  run() {
    const presentationContainer = createContainer({
      env,
      init: {
        http: this.http,
      },
    });

    if (this.http) {
      presentationContainer.httpPresentation.serve();
    }
  }
}

const app = new App({
  http: env.httpActive,
});

setImmediate(() => {
  app.run();
});
