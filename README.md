# Digit Puzzle

A puzzle where number fragments are connected by matching their first and last
two digits.

## Hosted version

[digit-puzzle-three.vercel.app](https://digit-puzzle-three.vercel.app/)

## Run locally

You need Node.js and npm.

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

## Tests and production build

```bash
npm test        # run tests
npm run lint    # lint the codebase
npm run build   # create a production build in dist/
npm run preview # preview the production build locally
```

Run `npm run build` before `npm run preview`.

## Algorithm

The chain-building function is in [`src/utils/buildChain.js`](./src/utils/buildChain.js).
Its tests are in [`src/utils/buildChain.test.js`](./src/utils/buildChain.test.js).

Earlier iterations of the algorithm are available in the Git history:

- `625ade8` — initial chain builder;
- `4ec64df` — extended the search for longer chains;
- `dec724c` — optimized the chain search.

View the commit history with `git log --oneline`.

## AI assistance

AI tools were used to discuss implementation approaches based on my ideas, explain alternative solutions, generate most of the UI styling, and assist with the README and unit tests. I made the final implementation decisions and verified the project with `npm test`, `npm run lint`, and `npm run build`.