const { spawn } = require('node:child_process');
const path = require('node:path');

const root = process.cwd();
const frontend = path.join(root, 'FranTech-main');
const backend = path.join(root, 'server');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const start = (name, dir, args) => {
  const child = spawn(npmCommand, args, {
    cwd: dir,
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
      process.exitCode = code ?? 1;
    }
  });

  return child;
};

const backendProcess = start('Backend', backend, ['run', 'dev']);
const frontendProcess = start('Frontend', frontend, ['run', 'dev']);

const stop = () => {
  backendProcess.kill();
  frontendProcess.kill();
};

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
