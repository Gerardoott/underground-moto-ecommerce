import posthog from 'posthog-js'
import * as Sentry from "@sentry/nextjs"

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: '2026-05-30',
})

Sentry.init({
  dsn: "https://71dea72403862ba8266a7e84515f9213@o4512057426444288.ingest.us.sentry.io/4512057509412864",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;