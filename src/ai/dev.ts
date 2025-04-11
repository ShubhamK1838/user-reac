import {defineDevServer} from '@genkit-ai/dev';
import * as path from 'path';

export default defineDevServer({
  modules: [path.join(__dirname, 'flows/generate-user-profile-summary.ts')],
});

