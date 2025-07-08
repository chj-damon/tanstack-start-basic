import { registerGlobalMiddleware } from '@tanstack/react-start';

import { authMiddleware } from './middlewares/authMiddleware';

registerGlobalMiddleware({
  middleware: [authMiddleware],
});