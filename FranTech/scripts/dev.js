// Starts the Express API (server/) and the Vite frontend together: npm run dev
import { spawn } from 'node:child_process';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const run = (name, args) => {
  const child = spawn(npm, args, { stdio: 'inherit', shell: true });
  child.on('exit', code => { if (code) console.error(`${name} exited with code ${code}`); });
  return child;
};
const children = [run('Backend', ['run', 'dev:backend']), run('Frontend', ['run', 'dev:frontend'])];
const stop = () => children.forEach(child => child.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
