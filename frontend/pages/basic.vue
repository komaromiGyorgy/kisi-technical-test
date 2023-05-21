<template>
  <main>
    <section v-if="!loadError" class="image-grid">
      <div class="header">
        <h3 class="image-grid-item custom-font heading-medium">
          Connect people & spaces
        </h3>
      </div>
      <template v-if="articles?.length">
        <ArticleCard
          v-for="(article, index) in articles"
          :key="index"
          class="image-grid-item"
          :article="article"
          :style="{
            width: `${article.meta.width}px`,
            height: `${article.meta.height}px`,
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
const { articles, error, loadError, uploadFile, loadArticles } = useArticles();
await loadArticles();
</script>

<style lang="scss" scoped>
.header {
  width: 420px;
  height: 168px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  float: left;
}
.image-grid {
  width: 100%;
  height: 100%;
  max-width: 1400px;
  margin: auto;
  @media screen and (max-width: 950px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.image-grid:after {
  content: "";
  display: block;
  clear: both;
}

.image-grid-item {
  float: left;
  margin: 10px;
  border-radius: 4px;
  overflow: hidden;
  @media screen and (max-width: 950px) {
    width: 100% !important;
    height: auto !important;
  }
}
</style>
