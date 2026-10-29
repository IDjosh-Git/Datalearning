/**
 * Vercel Speed Insights Initialization
 * This script initializes Speed Insights for the Data Analysis Learning Path
 * 
 * Speed Insights automatically tracks web vitals and performance metrics.
 * The script is injected automatically by Vercel during deployment.
 * This initialization sets up the required queue for the tracking script.
 */

// Initialize the Speed Insights queue if not already present
window.si = window.si || function () {
  (window.siq = window.siq || []).push(arguments);
};
