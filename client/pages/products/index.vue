<template>
  <div>
    <Header title="Products" />
    <div class="flex flex-wrap">
      <div class="flex flex-col w-3/4 mx-auto h-full p-4">
        <div v-if="products.length > 0" class="rounded overflow-hidden border">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-200">
                <th class="p-4 text-green-700 text-left">Name</th>
                <th class="p-4 text-green-700 text-left">Description</th>
                <th class="p-4 text-green-700 text-left">Category Name</th>
                <th class="p-4 text-green-700 text-left">Manufacture date</th>
                <th class="p-4"></th>
                <th class="p-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in products"
                :key="`${index}`"
                class="align-top"
              >
                <td class="p-4">{{ product.name }}</td>
                <td class="p-4">{{ product.description }}</td>
                <td class="p-4">{{ product.category_name }}</td>
                <td class="p-4">{{ product.manufacturing_date }}</td>
                <td class="p-4">
                  <Button
                    variant="primary"
                    :loading="false"
                    :disableButton="false"
                    size="small"
                    icon="edit"
                    @click="editProduct()"
                  />
                </td>
                <td class="p-4">
                  <Button
                    variant="danger"
                    :loading="false"
                    :disableButton="false"
                    size="small"
                    icon="trash-alt"
                    @click="deleteProduct()"
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
            No products found
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
          @click="createProductModalOpen()"
        >
          Create product
        </Button>
      </div>
    </div>
    <Modal
      :visible="productModalStatus.addProduct"
      @close="productModalStatus.addProduct = false"
    >
      <ValidationObserver ref="keyValueEditForm" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(createProductAction)">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Create new Product
                </h3>

                <div class="mt-2">
                  <p class="text-sm leading-5 text-gray-500">
                    This action will allow to create new product.
                  </p>
                  <p class="text-sm leading-5 text-gray-500"></p>
                </div>
                <div class="mt-2">
                  <div class="min-w-full">
                    <DropDown
                      name="category_id"
                      label="Category"
                      rules="required"
                      icon="folder"
                      placeholder="Please choose a category"
                      :options="categoryList"
                      class="my-4"
                      v-model="selectedProductCategory"
                    />
                  </div>
                </div>

                <div class="mt-2">
                  <div class="min-w-full">
                    <FormText
                      rules="required"
                      name="name"
                      label="Product name"
                      placeholder="Product name"
                      class="my-4"
                      icon="folder"
                      v-model="productName"
                    ></FormText>
                  </div>
                </div>

                <div class="mt-2">
                  <div class="min-w-full">
                    <FormText
                      name="value"
                      label="Product description"
                      placeholder="Product description"
                      class="my-4"
                      icon="folder"
                      v-model="productDescription"
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
                @click.native="productModalStatus.addProduct = false"
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import getProducts from "~/api/getProducts";
import Button from "~/components/Button";
import Header from "~/components/Header";
import DropDown from "~/components/DropDown";
import Modal from "~/components/Modal";
import agent from "~/api/agent";
export default {
  head: {
    title: "Products",
  },
  computed: {
    ...mapGetters({
      products: "products/allProducts",
      totalProducts: "products/totalProducts",
      categories: "categories/allCategories",
    }),
  },
  data() {
    return {
      categoryList: [],
      productModalStatus: {
        addProduct: false,
        editProduct: false,
        deleteProduct: false,
      },
      modalSubmitting: false,
      productName: "",
      productDescription: "",
      selectedProductCategory: "",
    };
  },
  methods: {
    editProduct() {},
    deleteProduct() {},
    createProductModalOpen() {
      if (this.categories.length > 0) {
        this.buildCategoryList();
        this.productModalStatus.addProduct = true;
      } else {
        this.$toast.show(
          "You must have at least one category in order to create products."
        );
      }
    },
    async createProductAction() {
      if (!this.productModalStatus.addProduct) {
        return;
      }

      if (this.modalSubmitting) {
        return;
      }

      this.modalSubmitting = true;

      const manufacture_date = new Date();

      let formData = {
        name: this.productName,
        description: this.productDescription,
        category: Number(this.selectedProductCategory),
        manufacturing_date: manufacture_date.toISOString().split("T")[0],
      };

      try {
        const productCreate = await agent.Products.create(formData);
        this.$store.dispatch("products/saveProduct", productCreate);
        this.productModalStatus.addProduct = false;
        this.clearModalData();
      } catch (error) {
      } finally {
        this.modalSubmitting = false;
      }
    },
    buildCategoryList() {
      this.categoryList = [];
      this.categories.forEach((category, index) => {
        let categoryObj = {};
        categoryObj["value"] = category.pk.toString();
        categoryObj["name"] = category.name;
        this.categoryList.push(categoryObj);
      });
    },
    clearModalData() {
      this.productName = "";
      this.productDescription = "";
    },
  },
  components: {
    Button,
    Header,
    DropDown,
    Modal,
  },
  async asyncData({ $axios, store, app, params, error }) {
    return await getProducts($axios, store, params, error)
      .then((res) => {})
      .catch((e) => {});
  },
};
</script>
