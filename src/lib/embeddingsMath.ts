/** L2-normalize in place; returns the same array. */
export function normalizeVector(v: number[]): number[] {
  let sum = 0
  for (const x of v) sum += x * x
  const norm = Math.sqrt(sum)
  if (norm === 0 || !Number.isFinite(norm)) return v
  for (let i = 0; i < v.length; i++) v[i] /= norm
  return v
}

/** Cosine similarity for equal-length vectors (assumes pre-normalized for speed). */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0
  let dot = 0
  for (let i = 0; i < a.length; i++) dot += a[i]! * b[i]!
  return dot
}

export function copyNormalized(v: number[]): number[] {
  return normalizeVector([...v])
}
