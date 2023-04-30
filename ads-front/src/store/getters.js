export const campaigns = (state) => {
  return state.campaigns
}

// export const campaignDetailTable = (state, { page, itemsPerPage, sortBy }) => {
//   const start = (page - 1) * itemsPerPage
//   const end = start + itemsPerPage
//   const items = state.campaignDetail.campaignHistory.slice()

//   if (sortBy.length) {
//     const sortKey = sortBy[0].key
//     const sortOrder = sortBy[0].order
//     items.sort((a, b) => {
//       const aValue = a[sortKey]
//       const bValue = b[sortKey]
//       return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
//     })
//   }

//   const paginated = items.slice(start, end)
//   return { items: paginated, total: items.length }
// }
