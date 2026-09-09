export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("es-PE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}