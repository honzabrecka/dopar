function unwrap(lazy) {
  return lazy();
}

async function $pmap(n, remaining, resolved) {
  const $remaining = remaining.slice(n);
  const $resolved = resolved.concat(
    await Promise.all(remaining.slice(0, n).map(unwrap))
  );
  if ($remaining.length > 0) return $pmap(n, $remaining, $resolved);
  return $resolved;
}

function pmap(n, promises) {
  if (n < 1) throw Error("n has to be greater or equal to 1");
  return $pmap(n, promises, []);
}

module.exports = pmap;
