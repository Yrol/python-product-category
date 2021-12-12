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
                    @click="showProducts(category.name, category.products)"
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
                    @click="editCategory()"
                  />
                </td>
                <td class="p-4">
                  <Button
                    variant="danger"
                    :loading="false"
                    :disableButton="false"
                    size="small"
                    icon="trash-alt"
                    @click="deleteCategory(category.pk, category.name)"
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
      <div class="flex flex-col w-1/4 mx-auto h-full p-4">
        <Button
          :variant="'success'"
          :loading="false"
          :disableButton="false"
          icon="sign-in-alt"
          size="small"
          width="full"
          @click="createCategoryModalOpen()"
        >
          Create category
        </Button>
      </div>
    </div>
    <Modal
      :visible="categoryModalStatus.addCategory"
      @close="categoryModalStatus.addCategory = false"
    >
      <ValidationObserver ref="keyValueEditForm" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(createCategoryAction)">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Create new Category
                </h3>

                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-500">
                    This action will allow to create new category.
                  </p>
                  <p class="text-sm leading-5 text-gray-500"></p>
                </div>

                <div class="mt-2">
                  <div class="min-w-full">
                    <FormText
                      rules="required"
                      name="name"
                      label="Category name"
                      placeholder="Category name"
                      class="my-4"
                      icon="folder"
                      v-model="categoryName"
                    ></FormText>
                  </div>
                </div>

                <div class="mt-2">
                  <div class="min-w-full">
                    <FormText
                      name="value"
                      label="Category description"
                      placeholder="Category description"
                      class="my-4"
                      icon="folder"
                      v-model="categoryDescription"
                    ></FormText>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <Button
                variant="success"
                :loading="modalSubmitting"
                :disableButton="modalSubmitting ? true : false"
                size="small"
                width="full"
              >
                Create
              </Button>
            </span>

            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <Button
                variant="white"
                @click.native="categoryModalStatus.addCategory = false"
                :disableButton="modalSubmitting ? true : false"
                size="small"
                width="full"
              >
                Cancel
              </Button>
            </span>
          </div>
        </form>
      </ValidationObserver>
    </Modal>

    <Modal
      :visible="categoryModalStatus.deleteCategory"
      @close="categoryModalStatus.deleteCategory = false"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div
            class="
              mx-auto
              flex-shrink-0 flex
              items-center
              justify-center
              h-12
              w-12
              rounded-full
              bg-red-100
              sm:mx-0 sm:h-10 sm:w-10
            "
          >
            <svg
              class="h-6 w-6 text-red-600"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Are you sure?
            </h3>

            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500">
                This action will permanently delete the Category :
                {{ deleteCategoryName }}, and its products.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
          <Button
            variant="danger"
            @click="deleteCategoryConfirmAction()"
            :loading="modalSubmitting"
            :disableButton="modalSubmitting ? true : false"
            size="small"
            width="full"
          >
            Yes, Proceed
          </Button>
        </span>

        <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
          <Button
            variant="white"
            @click="categoryModalStatus.deleteCategory = false"
            :disableButton="modalSubmitting ? true : false"
            size="small"
            width="full"
          >
            No
          </Button>
        </span>
      </div>
    </Modal>

    <Modal
      :visible="categoryModalStatus.showProducts"
      @close="categoryModalStatus.showProducts = false"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Products belong to: {{ currentCategory }}
            </h3>

            <div class="mt-2">
              <ul>
                <li
                  v-for="(product, index) in categoryProducts"
                  :key="`${index}`"
                  class="text-sm leading-5 text-gray-500"
                >
                  - {{ product }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import getCategories from "~/api/getCategories";
import Button from "~/components/Button";
import Header from "~/components/Header";
import Modal from "~/components/Modal";
import FormText from "~/components/FormText";
import agent from "~/api/agent";
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
  components: {
    Button,
    Header,
    Modal,
    FormText,
  },
  data() {
    return {
      categoryModalStatus: {
        addCategory: false,
        editCategory: false,
        deleteCategory: false,
        showProducts: false,
      },
      modalSubmitting: false,
      categoryName: "",
      categoryDescription: "",
      deleteCategoryId: null,
      deleteCategoryName: null,
      currentCategory: null,
      categoryProducts: [],
    };
  },
  methods: {
    createCategoryModalOpen() {
      this.categoryModalStatus.addCategory = true;
    },
    async createCategoryAction() {
      if (!this.categoryModalStatus.addCategory) {
        return;
      }

      if (this.modalSubmitting) {
        return;
      }

      this.modalSubmitting = true;

      let formData = {
        name: this.categoryName,
        description: this.categoryDescription,
      };

      try {
        const categoryCreate = await agent.Categories.create(formData);
        this.$store.dispatch("categories/saveCategory", categoryCreate);
        this.categoryModalStatus.addCategory = false;
        this.clearModalData();
      } catch (error) {
      } finally {
        this.modalSubmitting = false;
      }
    },
    async deleteCategoryConfirmAction() {
      if (!this.categoryModalStatus.deleteCategory) {
        return;
      }

      if (this.modalSubmitting) {
        return;
      }

      this.modalSubmitting = true;

      try {
        await agent.Categories.delete(this.deleteCategoryId);
        this.$store.dispatch(
          "categories/deleteCategory",
          this.deleteCategoryId
        );
        this.categoryModalStatus.deleteCategory = false;
      } catch (error) {
      } finally {
        this.modalSubmitting = false;
      }
    },
    editCategory() {},
    deleteCategory(catId, catName) {
      this.deleteCategoryId = catId;
      this.deleteCategoryName = catName;
      this.categoryModalStatus.deleteCategory = true;
    },
    showProducts(currentCategory, products) {
      this.currentCategory = currentCategory;

      if (products.length > 0) {
        this.categoryProducts = products;
        this.categoryModalStatus.showProducts = true;
      } else {
        this.$toast.show("No products found for this category.");
      }
    },
    clearModalData() {
      this.categoryName = "";
      this.categoryDescription = "";
    },
  },
  async asyncData({ $axios, store, app, params, error }) {
    return await getCategories($axios, store, params, error)
      .then((res) => {})
      .catch((e) => {});
  },
};
</script>
