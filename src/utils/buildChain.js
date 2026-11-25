export function buildChain(numbersString) {
  const arr = numbersString.split(/[,\s]+/).filter(Boolean);
  const first = arr.shift();
  const chainArr = first ? [first] : [];
  let added = true;

  while (added) {
    added = false;
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (item.slice(-2) === chainArr[0].slice(0, 2)) {
        chainArr.unshift(item);
        arr.splice(i, 1);
        added = true;
        i--;
      } else if (item.slice(0, 2) === chainArr[chainArr.length - 1].slice(-2)) {
        chainArr.push(item);
        arr.splice(i, 1);
        added = true;
        i--;
      }
    }
  }

  const chain = chainArr
    .map((part, idx) => (idx === 0 ? part : part.slice(2)))
    .join('');

  return { chain, chainArr, chainCount: chainArr.length };
}
