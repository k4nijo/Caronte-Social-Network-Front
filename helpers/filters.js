export function filterPosts(filter, posts) {
  let filteredList = [...posts]

  // Filter category
  if (filter.category !== '') {
    const filtered = filteredList
      .filter((post) => post.category === filter.category)
      .sort((a, b) => a.publishDate - b.publishDate)
    filteredList = filtered
  }

  // Search
  if (filter.search !== '') {
    const searchList = []
    const searchTerm = filter.search.toLowerCase()
    for (let i = 0; i < filteredList.length; i++) {
      if (
        filteredList[i].title !== null &&
        filteredList[i].title.toLowerCase().includes(searchTerm)
      ) {
        searchList.unshift(filteredList[i])
      }
    }
    filteredList = searchList
  }

  return filteredList
}

export function filterUsers(filter, users) {
  let filteredList = [...users]

  if (filter.search !== '') {
    const searchList = []
    const searchTerm = filter.search.toLowerCase()

    for (let i = 0; i < filteredList.length; i++) {
      if (
        filteredList[i].username !== null &&
        filteredList[i].username.toLowerCase().includes(searchTerm)
      ) {
        searchList.push(filteredList[i])
      }
    }
    filteredList = searchList
  }

  return filteredList
}

import moment from 'moment'
export function orderPosts(order, posts) {
  const orderedList = [...posts]

  if (order === 'publishDate') {
    orderedList.sort(function (a, b) {
      const unixA = moment(a.publishDate).unix()
      const unixB = moment(b.publishDate).unix()
      return unixA < unixB ? -1 : 1
    })
  } else {
    orderedList.sort(function (a, b) {
      const nameA = a[order] ? a[order].toLowerCase() : 'zzz'
      const nameB = b[order] ? b[order].toLowerCase() : 'zzz'
      return nameA < nameB ? -1 : 1
    })
  }

  return orderedList
}
