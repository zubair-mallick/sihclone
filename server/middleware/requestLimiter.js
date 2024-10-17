let requestCount = 0;
const requestLimit = 5;
const resetInterval = 60000; // 60 seconds (1 minute)
let requestResetTimeout;

export const rateLimiter = (req, res, next) => {
  if (!requestResetTimeout) {
    requestResetTimeout = setTimeout(() => {
      requestCount = 0;
      requestResetTimeout = null;
    }, resetInterval);
  }

  if (requestCount >= requestLimit) {
    return res.status(429).json({ error: "Too Many Requests - please try again later." });
  }

  requestCount++;
  next();
};
