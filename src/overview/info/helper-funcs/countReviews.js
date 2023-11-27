const countStarsAndReviews = (product) => {
  let stars = 0;
  let reviews = 0;

  for (var starsGiven in product.reviews) {
    stars += (starsGiven * product.reviews[starsGiven]);
    reviews += Number(product.reviews[starsGiven]);
  }

  return {
    stars: stars,
    reviews: reviews,
  }
};

export default countStarsAndReviews;