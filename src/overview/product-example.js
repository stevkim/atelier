const productExample = {
  product_id: 1,
  name: 'test title',
  category: 'test category',
  reviews: {
    1: 1,
    2: 4,
    3: 5,
    4: 8,
    5: 12,
  },
  slogan: 'is a test!',
  description: 'This test is the testiest test of all time.',
  features: [
    {
      feature: 'testability',
      value: 'high',
    },
    {
      feature: 'nontestability',
      value: 'low',
    },
  ],
  styles: [
    {
      style_id: 1,
      name: 'test style',
      original_price: 12,
      sale_price: 7,
      default: true,
      photos: [
        {
          thumbnail_url: 'https://i.imgur.com/lQU6jgl.jpeg',
          url: 'https://i.imgur.com/lQU6jgl.jpeg',
        },
      ],
      skus: { // WHY would we do it this way? This should be an array!
        37: {
          quantity: 0,
          size: 'XS',
        },
        39: {
          quantity: 9001,
          size: 'M',
        },
        41: {
          quantity: 3,
          size: 'XL',
        },
      },
    },
    {
      style_id: 2,
      name: 'test style 2: electric boogaloo',
      original_price: 8,
      sale_price: 0,
      default: false,
      photos: [
        {
          thumbnail_url: 'https://i.imgur.com/lQU6jgl.jpeg',
          url: 'https://i.imgur.com/lQU6jgl.jpeg',
        },
      ],
      skus: {
        38: {
          quantity: 1,
          size: 'S',
        },
        39: {
          quantity: 0,
          size: 'M',
        },
        40: {
          quantity: 2,
          size: 'L',
        },
      },
    },
  ],
};

export default productExample;

/* The above can be made like so, given only a productId
 * let productLevelInfo = GET /products/:productId
 * let styleInfo = GET /products/:productId/styles
 * let reviewMetadata = GET /reviews/meta {productId}
 *
 * If these requests are already made elsewhere, it can
 * all be synced up with my wrangler function.
 *
 * product = {
 *   id: productId,
 *   title: productLevelInfo.name,
 *   category: productLevelInfo.category,
 *   reviews: reviewMetadata.ratings,
 *   overview: {
 *     slogan: productLevelInfo.slogan,
 *     features: productLevelInfo.features,
 *     description: productLevelInfo.description,
 *   styles: styleInfo.results,
 */
