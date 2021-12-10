<template>
  <client-only>
    <div>
      <div class="container mx-auto p-2">
        <div
          class="max-w-sm mx-auto my-24 bg-white px-5 py-10 rounded shadow-xl"
        >
          <div class="text-center mb-8">
            <h1 class="font-bold text-2xl font-bold">Options</h1>
          </div>
          <div class="mt-10">
            <Button
              :variant="'success'"
              :loading="false"
              :disableButton="false"
              icon="sign-in-alt"
              size="small"
              width="full"
            >
              Products
            </Button>
          </div>
          <div class="mt-10">
            <Button
              :variant="'primary'"
              :loading="false"
              :disableButton="false"
              icon="sign-in-alt"
              size="small"
              width="full"
            >
              Categories
            </Button>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>
<script>
import Button from "~/components/Button";
export default {
  head: {
    title: "Python App",
  },
};
</script>
