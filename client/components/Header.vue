<template>
  <div
    class="
      border-b
      md:flex md:items-center md:justify-between
      p-4
      pb-0
      shadow-lg
      md:pb-4
    "
  >
    <div class="flex items-center justify-between mb-4 md:mb-0">
      <h1 class="leading-none text-2xl text-grey-darkest">
        <a class="no-underline text-grey-darkest hover:text-black" href="#">
          {{ title }}
        </a>
      </h1>

      <a class="text-black hover:text-orange md:hidden" href="#">
        <i class="fa fa-2x fa-bars"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "header",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
