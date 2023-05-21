<template>
  <main :style="{ opacity: isLayedOut ? 1 : 0 }">
    <section v-if="!loadError" class="image-grid">
      <div class="header image-grid-item" style="width: 480px">
        <h3 class="custom-font heading-medium">Connect people & spaces</h3>
      </div>
      <template v-if="articles?.length">
        <ArticleCard
          v-for="(article, index) in articles"
          :key="index"
          class="image-grid-item"
          :article="article"
          :style="{
            width: `${getSizing(article.meta).width}px`,
            height: `${getSizing(article.meta).height}px`,
          }"
        >
        </ArticleCard>
      </template>
      <div class="image-grid-item">
        <UploadButton @file="uploadFile" :error="error">Button</UploadButton>
      </div>
    </section>
    <section v-else>
      {{ loadError || "Error loading articles, please try again" }}
    </section>
  </main>
</template>

<script setup lang="ts">
import { Meta } from "~/types/article";
const { articles, error, loadError, uploadFile, loadArticles } = useArticles();
let msnry: import("masonry-layout");
const isLayedOut = ref(false);
const singleWidth = 160;
const singleHeight = 120;

function getSizing(meta: Meta) {
  const widthMultiplier = Math.round(meta.width / singleWidth);
  const heightMultiplier = Math.round(meta.height / singleHeight);
  return {
    width: widthMultiplier * singleWidth,
    height: heightMultiplier * singleHeight,
  };
}
onMounted(initMasonry);

async function initMasonry() {
  const { default: Masonry } = await import("masonry-layout");

  const masonry = new Masonry(".image-grid", {
    itemSelector: ".image-grid-item",
    columnWidth: 160,
    gutter: 20,
    initLayout: false,
  });
  msnry = masonry;
  masonry.on?.("layoutComplete", () => {
    isLayedOut.value = true;
  });
  masonry.layout?.();
}
watch(
  () => articles.value?.length,
  () => {
    msnry?.layout?.();
    initMasonry();
  }
);
await loadArticles();
</script>

<style lang="scss" scoped>
.image-grid {
  max-width: 1400px;
  width: 100%;
  margin: auto;
}
.image-grid-item {
  width: 160px;
  height: 120px;
  float: left;
  border-radius: 5px;
  margin: 10px;
}
</style>
