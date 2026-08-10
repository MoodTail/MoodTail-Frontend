function normalizeTermTitle(value: string) {
  return value
    .replace(/^#+\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function stripDuplicateMarkdownTitle(content: string, title: string) {
  const lines = content.replace(/^\uFEFF/, '').split(/\r?\n/)
  const firstContentIndex = lines.findIndex((line) => line.trim().length > 0)

  if (firstContentIndex === -1) return content

  const firstLine = lines[firstContentIndex].trim()
  if (normalizeTermTitle(firstLine) !== normalizeTermTitle(title)) return content

  let nextIndex = firstContentIndex + 1
  while (nextIndex < lines.length && lines[nextIndex].trim().length === 0) {
    nextIndex += 1
  }

  return [...lines.slice(0, firstContentIndex), ...lines.slice(nextIndex)].join('\n')
}
