export default async ($axios, store, params, error) => {

  const allProducts = await $axios.$get('/api/product/');

  const allCategories = await $axios.$get('/api/category/');

  if (allProducts?.length && allProducts.length <= 0) {
    throw error({ statusCode: 404, message: 'No Products found!' });
  }

  if (allCategories?.length && allCategories?.length > 0) {
    store.dispatch('categories/categories',allCategories);
    store.dispatch('categories/totalCategories',allCategories.length);
  }

  store.dispatch('products/products',allProducts);
  store.dispatch('products/totalProducts',allProducts.length);

  return {
    allProducts
  }
}
