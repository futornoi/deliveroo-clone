import sanity from './sanity'

export const allFeaturedQuery = `
  *[_type == 'featured'] {
    "id": _id,
    name,
    shortDescription,
    restaurants[]->{
      "id": _id,
      image,
      name,
      rating,
      address,
      type->{name},
    },  
  }
`

export const allCategoriesQuery = `
  *[_type == 'category'] {
    "id": _id,
    name,
    image
  }
`

export const restaurantInfoQuery = `
  *[_type == 'restaurant' && _id == $id] {
    "id": _id,
    image,
    name,
    rating,
    address,
    lat,
    long,
    shortDescription,
    'category': type->{name},
    dishes[]->{
      "id": _id,
      name,
      price,
      shortDescription,
      image
    }
  }[0]
`

export const currentRestaurantsQuery = `
  *[_type == 'restaurant' && _id in $ids] {
      "id": _id,
      image,
      name,
      rating,
      address,
      lat,
      long,
      shortDescription,
      type->{name},
  }
`

// QUERIES

export const getAllFeatured = () => {
  return sanity.fetch(allFeaturedQuery)
}

export const getAllCategories = () => {
  return sanity.fetch(allCategoriesQuery)
}

export const getRestaurantInfo = id => {
  return sanity.fetch(restaurantInfoQuery, { id })
}

export const getRestaurantsById = ids => {
  return sanity.fetch(currentRestaurantsQuery, { ids })
}
