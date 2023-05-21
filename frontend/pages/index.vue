<template>
  <main class="wrapper" :style="{ opacity: isLayedOut ? 1 : 0 }">
    <section
      v-if="!loadError"
      class="image-grid"
      :style="{
        gridTemplateColumns: `repeat(${gridColumns}, ${singleWidth}px)`,
        gridTemplateRows: `repeat(${gridRows}, ${singleHeight}px)`,
      }"
    >
      <div class="header">
        <h3 class="custom-font heading-medium">Connect people & spaces</h3>
      </div>
      <template v-if="articles?.length">
        <ArticleCard
          v-for="(article, index) in articles"
          :key="index"
          class="image-grid-item"
          :article="article"
          :style="{
            gridColumn: `span ${spanCol(article.meta.width)}`,
            gridRow: `span ${spanRow(article.meta.height)}`,
          }"
        >
        </ArticleCard>
      </template>
      <div class="upload-btn">
        <UploadButton @file="uploadFile" :error="error">Button</UploadButton>
      </div>
    </section>
    <section v-else>
      {{ loadError || "Error loading articles, please try again" }}
    </section>
  </main>
</template>

<script setup lang="ts">
const { articles, error, loadError, uploadFile, loadArticles } = useArticles();
await loadArticles();

const singleWidth = 160;
const singleHeight = 120;
const gridColumns = ref(6);
const gridRows = ref(6);
const isLayedOut = ref(false);

const spanRow = (height: number) => Math.round(height / singleHeight);
const spanCol = (width: number) => Math.round(width / singleWidth);

onMounted(() => {
  adjustGrid();
  window.addEventListener("resize", adjustGrid);
  isLayedOut.value = true;
});

function adjustGrid() {
  console.log("resize");
  gridColumns.value = Math.floor(
    (Math.min(window.innerWidth, 1440) - 70 * 2) / (singleWidth + 20)
  );
  gridRows.value = Math.floor(
    (window.innerHeight - 100 * 2) / (singleHeight + 20)
  );
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.image-grid {
  display: grid;
  gap: 20px;
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.header {
  grid-column: span 3;
  grid-row: span 1;
  @media screen and (max-width: 950px) {
    width: 100%;
  }
}
.upload-btn {
  grid-column: span 1;
  grid-row: span 1;
  @media screen and (max-width: 950px) {
    width: 100%;
  }
}
</style>
