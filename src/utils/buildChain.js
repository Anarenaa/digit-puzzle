export function buildChain(numbersString, maxSteps = 3000000) {
  const parts = numbersString.split(/[,\s]+/).filter(Boolean);
  if (!parts.length) return { chain: '', chainArr: [], chainCount: 0 };

  let best = [];
  let steps = 0;

  function dfs(chain, used) {
    if (++steps > maxSteps) return;
    if (chain.length > best.length) best = [...chain];

    if (chain.length + (parts.length - chain.length) <= best.length) return;

    const first = chain[0];
    const last = chain[chain.length - 1];
    const head = first.slice(0, 2);
    const tail = last.slice(-2);

    for (let i = 0; i < parts.length; i++) {
      if (used[i] || steps > maxSteps) continue;
      const item = parts[i];

      if (item.slice(-2) === head) {
        used[i] = true;
        chain.unshift(item);
        dfs(chain, used);
        chain.shift();
        used[i] = false;
      } else if (item.slice(0, 2) === tail) {
        used[i] = true;
        chain.push(item);
        dfs(chain, used);
        chain.pop();
        used[i] = false;
      }
    }
  }

  for (let i = 0; i < parts.length && steps <= maxSteps; i++) {
    const used = Array(parts.length).fill(false);
    used[i] = true;
    dfs([parts[i]], used);
  }

  const chain = best
    .map((part, idx) => (idx === 0 ? part : part.slice(2)))
    .join('');

  return { chain, chainArr: best, chainCount: best.length };
}
