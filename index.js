function unwrap(lazy) {
  return lazy();
}

async function $dopar(n, remaining, resolved) {
  const $remaining = remaining.slice(n);
  const $resolved = resolved.concat(
    await Promise.all(remaining.slice(0, n).map(unwrap))
  );
  if ($remaining.length > 0) return $dopar(n, $remaining, $resolved);
  return $resolved;
}

function dopar(n, promises) {
  if (n < 1) throw new Error("n has to be greater or equal to 1");
  return $dopar(n, promises, []);
}

module.exports = dopar;
