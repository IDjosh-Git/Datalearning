/** Keep cache regression tests compatible with new releases.
 * Reject stale pre-v40 caches, but allow newer cache revisions.
 */
export function hasCurrentPublicCache(workerSource, minimumRevision = 40) {
  const source = String(workerSource || '');
  const match = source.match(/\bconst\s+CACHE\s*=\s*['"]dalp-public-[a-z0-9-]+-v(\d+)['"]/);
  return Boolean(match && Number(match[1]) >= minimumRevision
    && source.includes("k.startsWith('dalp-public-')")
    && source.includes('k!==CACHE'));
}
