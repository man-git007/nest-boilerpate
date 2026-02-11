export const RateLimits = {
  // Requests per minute
  RISK_ENGINE_API: 100,
  LLM_API: 50,
  GENERAL_API: 1000,

  // Burst limits
  BURST_LIMIT: 10,

  // Window sizes in milliseconds
  WINDOW_MS: 60000, // 1 minute
  BURST_WINDOW_MS: 1000, // 1 second
} as const;
