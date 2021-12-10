export default async ($axios, store, params, error) => {

  const allProducts = await $axios.$get('/api/product/');

  if (allProducts?.length && allProducts.length <= 0) {
    throw error({ statusCode: 404, message: 'No Products found!' });
  }

  store.dispatch('products/products',allProducts);
  store.dispatch('products/totalProducts',allProducts.length);

  return {
    allProducts
  }
}
