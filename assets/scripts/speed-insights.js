// Vercel Speed Insights initialization
// Automatically tracks page performance metrics and Core Web Vitals

import { injectSpeedInsights } from 'https://cdn.jsdelivr.net/npm/@vercel/speed-insights@2/dist/index.mjs';

// Initialize Speed Insights with default configuration
// This will automatically collect and report performance metrics to Vercel
injectSpeedInsights({
  debug: false, // Set to true in development to see console logs
});
