export default async ($axios, store, params, error) => {

  const allCategories = await $axios.$get('/api/category/');

  if (allCategories?.length && allCategories?.length <= 0) {
    throw error({ statusCode: 404, message: 'No Categories found!' });
  }

  // //storing pagination state
  // store.dispatch('posts/allPosts',allPosts);

  return {
    allCategories
  }
}
