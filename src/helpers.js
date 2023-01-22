const currencyFormat = currency => price => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency ?? 'USD' }).format(
    price,
  )
}

export const formatToGBP = currencyFormat('GBP')
