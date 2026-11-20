import { spawnSync } from 'node:child_process';

// Never use a real form key in test artifacts. Never deploy this build.
const result = spawnSync(process.execPath, ['node_modules/astro/astro.js', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PREVIEW: '',
    PUBLIC_PREVIEW: '',
    PUBLIC_WEB3FORMS_KEY: 'quality-tests-not-a-real-access-key',
  },
});
process.exit(result.status ?? 1);
