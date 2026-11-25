function createNodes(parts) {
  const n = parts.length;
  const nodes = parts.map((value, idx) => ({
    idx,
    value,
    first2: value.slice(0, 2),
    last2: value.slice(-2),
    next: [],
    prev: [],
  }));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && nodes[i].last2 === nodes[j].first2) {
        nodes[i].next.push(j);
        nodes[j].prev.push(i);
      }
    }
  }

  return nodes;
}

function calcMaxSteps(n, nodes) {
  const edgesCount = nodes.reduce((sum, node) => sum + node.next.length, 0);
  return Math.min(4_000_000, Math.max(50_000, n * 5_000 + edgesCount * 10_000));
}

function runDfs(ctx, current, used) {
  if (++ctx.steps > ctx.maxSteps) return;
  if (current.length > ctx.bestIndices.length) {
    ctx.bestIndices = [...current];
  }
  if (ctx.bestIndices.length >= ctx.maxPossible) return;

  const head = ctx.nodes[current[0]];
  const tail = ctx.nodes[current[current.length - 1]];

  for (const nextIdx of tail.next) {
    if (used[nextIdx] || ctx.steps > ctx.maxSteps) continue;
    used[nextIdx] = true;
    current.push(nextIdx);
    runDfs(ctx, current, used);
    current.pop();
    used[nextIdx] = false;
  }

  for (const prevIdx of head.prev) {
    if (used[prevIdx] || ctx.steps > ctx.maxSteps) continue;
    used[prevIdx] = true;
    current.unshift(prevIdx);
    runDfs(ctx, current, used);
    current.shift();
    used[prevIdx] = false;
  }
}

function formatResult(nodes, bestIndices) {
  const chainArr = bestIndices.map((idx) => nodes[idx].value);
  const chain = chainArr
    .map((part, idx) => (idx === 0 ? part : part.slice(2)))
    .join('');

  return { chain, chainArr, chainCount: chainArr.length };
}

export function buildChain(numbersString) {
  const parts = numbersString.split(/[,\s]+/).filter(Boolean);
  const n = parts.length;
  if (!n) return { chain: '', chainArr: [], chainCount: 0 };

  const nodes = createNodes(parts);
  const maxPossible = Math.max(
    1,
    nodes.filter((node) => node.next.length || node.prev.length).length,
  );

  const ctx = {
    nodes,
    maxPossible,
    maxSteps: calcMaxSteps(n, nodes),
    steps: 0,
    bestIndices: [],
  };

  const startOrder = nodes
    .map((_, idx) => idx)
    .sort((a, b) => nodes[a].next.length - nodes[b].next.length);

  for (const startIdx of startOrder) {
    if (ctx.steps > ctx.maxSteps || ctx.bestIndices.length >= maxPossible)
      break;
    const used = Array(n).fill(false);
    used[startIdx] = true;
    runDfs(ctx, [startIdx], used);
  }

  return formatResult(nodes, ctx.bestIndices);
}
