const countReviews = (product) => {
  let totalReviews = 0;
  let totalStars = 0;

  for (var starsGiven in product.reviews) {
    totalStars += (starsGiven * product.reviews[starsGiven]);
    totalReviews += Number(product.reviews[starsGiven]);
  }

  const score = totalStars / totalReviews;
  return {
    {score},
    {totalReviews}
  }
}