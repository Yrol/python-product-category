<template>
  <div class="flex flex-wrap">
    <div class="flex flex-col w-3/4 mx-auto h-full p-4">
      <div class="rounded overflow-hidden border">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-4 text-green-700 text-left">Name</th>
              <th class="p-4 text-green-700 text-left">Description</th>
              <th class="p-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="`${index}`">
              <td class="p-4">{{ category.name }}</td>
              <td class="p-4">{{ category.description }}</td>
              <td class="p-4">View Products | Edit | Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import getCategories from "~/api/getCategories";
export default {
  head: {
    title: "Categories",
  },
  data() {
    return {
      categories: [],
    };
  },
  components: {},
  async asyncData({ $axios, store, app, params, error }) {
    return await getCategories($axios, store, params, error)
      .then((res) => {
        return {
          categories: res.allCategories,
        };
      })
      .catch((e) => {});
  },
};
</script>
