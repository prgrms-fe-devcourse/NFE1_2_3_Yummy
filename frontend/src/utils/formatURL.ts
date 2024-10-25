export const formatCategoryForURL = (category: string): string => {
  return category.replace(/\s+/g, '').toLowerCase()
}
