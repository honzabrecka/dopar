const R = require("ramda");
const { forAll, gen } = require("rapid-check");
const toMatchProperty = require("rapid-check/src/jest.matcher");
const pmap = require("../index");

jest.setTimeout(300000);
expect.extend({ toMatchProperty });

const delay = t =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  });

const roundTo = (x, n) => Math.round(n / x) * x;

const t = 300;

const createPromise = value => async () => {
  const start = Date.now();
  await delay(t);
  return { start, value };
};

const groupedValuesByStart = R.pipe(
  R.groupBy(({ start }) => roundTo(t, start)),
  R.values,
  R.sortBy(([{ start }]) => start),
  R.map(R.map(({ value }) => value))
);

test("n has to be > 0", () => {
  expect(() => pmap(0, [])).toThrowError("n has to be greater or equal to 1");
});

test("pmap", async () => {
  const opts = {
    count: 100
  };
  const n = gen.choose(1, 10);
  const input = gen.array(gen.uint);

  await expect(gen.tuple(n, input)).toMatchProperty(async ([n, input]) => {
    const result = await pmap(n, R.map(createPromise, input));
    const expected = R.splitEvery(n, input);
    const actual = groupedValuesByStart(result);
    return R.equals(expected, actual);
  }, opts);
});
