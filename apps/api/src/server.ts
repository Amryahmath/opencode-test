// apps/api/src/server.ts
import app from './app';
import { env } from './config/env';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
});

export default app;