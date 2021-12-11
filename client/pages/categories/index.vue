<template>
  <div>
    <Header title="Categories" />
    <div class="flex flex-wrap">
      <div class="flex flex-col w-3/4 mx-auto h-full p-4">
        <div v-if="totalCategories > 0" class="rounded overflow-hidden border">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-200">
                <th class="p-4 text-green-700 text-left">Name</th>
                <th class="p-4 text-green-700 text-left">Description</th>
                <th class="p-4"></th>
                <th class="p-4"></th>
                <th class="p-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(category, index) in categories"
                :key="`${index}`"
                class="align-top"
              >
                <td class="p-4">{{ category.name }}</td>
                <td class="p-4">{{ category.description }}</td>
                <td class="p-4">
                  <Button
                    :variant="'primary'"
                    :loading="false"
                    :disableButton="false"
                    icon="sign-in-alt"
                    size="small"
                    width="medium"
                    @click="showProducts()"
                  >
                    Show Products
                  </Button>
                </td>
                <td class="p-4">
                  <Button
                    variant="primary"
                    :loading="false"
                    :disableButton="false"
                    size="small"
                    icon="edit"
                    @click="goToEdit()"
                  />
                </td>
                <td class="p-4">
                  <Button
                    variant="danger"
                    :loading="false"
                    :disableButton="false"
                    size="small"
                    icon="trash-alt"
                    @click="deleteProduct(postData.slug, postData.id)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="rounded overflow-hidden">
          <p
            class="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800"
          >
            No categories found
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import getCategories from "~/api/getCategories";
import Button from "~/components/Button";
import Header from "~/components/Header";
export default {
  head: {
    title: "Categories",
  },
  computed: {
    ...mapGetters({
      categories: "categories/allCategories",
      totalCategories: "categories/totalCategories",
    }),
  },
  data() {
    return {};
  },
  components: {
    Button,
    Header,
  },
  async asyncData({ $axios, store, app, params, error }) {
    return await getCategories($axios, store, params, error)
      .then((res) => {})
      .catch((e) => {});
  },
};
</script>
