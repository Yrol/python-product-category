export default async ($axios, store, params, error) => {

  const allCategories = await $axios.$get('/api/category/');

  if (allCategories?.length && allCategories?.length <= 0) {
    throw error({ statusCode: 404, message: 'No Categories found!' });
  }

  store.dispatch('categories/categories',allCategories);
  store.dispatch('categories/totalCategories',allCategories.length);

  return {
    allCategories
  }
}
