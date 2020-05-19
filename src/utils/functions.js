export const handleCallbacks = (callbacks) => {
  if (Array.isArray(callbacks)) callbacks.forEach(callback => callback())
}
