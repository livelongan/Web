export const getResponseFilename = (contentDisposition: string) => {
  let match = contentDisposition.match(/filename\ *= UTF-8''([^;]+)/i)
  if (match && match[1]) {
    return decodeURIComponent(match[1])
  }
  match = contentDisposition.match(/filename="?([^";]+)"?/i)
  if (match && match[1]) {
    return match[1]
  }
  return ''
}
export const download = (data: BlobPart, filename: string, type?: string) => {
  const blob = new Blob([data], {
    type: type ?? 'text/csv; charset=utf-8;',
  })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove
  window.URL.revokeObjectURL(url)
}
