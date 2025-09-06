// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4387212b312f8cdb4a5177a37fb630e3@o4509966266793984.ingest.us.sentry.io/4509966271119360",

  integrations: [
    //Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      colorScheme: "system", // system | light | dark
      showName: true,
      showEmail: true,
      enableScreenshot: true,
    }),
  ],

  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
