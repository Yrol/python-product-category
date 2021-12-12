export default async ($axios, store, params, error) => {

  const allProducts = await $axios.$get('/api/product/');
  const allCategories = await $axios.$get('/api/category/');

  store.dispatch('categories/categories',allCategories);
  store.dispatch('categories/totalCategories',allCategories.length);

  store.dispatch('products/products',allProducts);
  store.dispatch('products/totalProducts',allProducts.length);

  return {
    allProducts
  }
}
