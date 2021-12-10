<template>
  <div class="flex flex-wrap">
    <div class="flex flex-col w-3/4 mx-auto h-full p-4">
      <div class="rounded overflow-hidden border">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-4 text-green-700 text-left">Name</th>
              <th class="p-4 text-green-700 text-left">Description</th>
              <th class="p-4 text-green-700 text-left">Category Name</th>
              <th class="p-4 text-green-700 text-left">Manufacture date</th>
              <th class="p-4 text-green-700 text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="`${index}`">
              <td class="p-4">{{ product.name }}</td>
              <td class="p-4">{{ product.description }}</td>
              <td class="p-4">{{ product.category_name }}</td>
              <td class="p-4">{{ product.manufacturing_date }}</td>
              <td class="p-4">Edit | Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import getProducts from "~/api/getProducts";
import Button from "~/components/Button";
export default {
  head: {
    title: "Products",
  },
  data() {
    return {
      products: [],
    };
  },
  components: {
    Button,
  },
  async asyncData({ $axios, store, app, params, error }) {
    return await getProducts($axios, store, params, error)
      .then((res) => {
        return {
          products: res.allProducts,
        };
      })
      .catch((e) => {});
  },
};
</script>
