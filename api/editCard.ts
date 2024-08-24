export const editCard = async (endpoint: string, cardId: string) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(cardId),
  })
  if (!response.ok) {
    return 0
  }
  return 1
}
