export function trackEvent(name: string, data?: Record<string, any>) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(name, data);
  } else {
    console.warn("Umami tracking is not available in this environment.");
  }
}
