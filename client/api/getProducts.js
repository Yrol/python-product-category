export default async ($axios, store, params, error) => {

  const allProducts = await $axios.$get('/api/product/');

  // //storing pagination state
  // store.dispatch('posts/allPosts',allPosts);

  return {
    allProducts
  }
}
