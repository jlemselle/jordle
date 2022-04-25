import { Jordle } from '@jordle/jordle-core';
import { createInterface } from 'readline/promises';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
(async () => {
  const jordle = new Jordle('INTENT');

  while (!jordle.isComplete()) {
    const name = await rl.question('What is your name? ');
    rl.write(`Hello, ${name}!`);
  }

  rl.close();
})();
