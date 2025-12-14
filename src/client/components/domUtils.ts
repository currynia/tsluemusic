export async function fetchData(url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const isElementOverflowing = (element: HTMLElement) => {
  const overflowX = element.offsetWidth < element.scrollWidth,
    overflowY = element.offsetHeight < element.scrollHeight

  return overflowX || overflowY
}
