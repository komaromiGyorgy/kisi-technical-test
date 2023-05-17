<template>
  <main>
    <section class="image-grid">
      <div
        v-for="article in decodedData"
        :key="article.imageUrl"
        class="card"
        :style="article.style"
      >
        <!-- <div class="card-front"> -->
        <nuxt-img
          class="card-front-image"
          :src="article.path"
          :alt="article.title"
          :width="article.width"
          :height="article.height"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          sizes="sm:100vw md:600px lg:800px"
          format="webp"
          :style="article.style"
        />
        <!-- <div class="card-front-overlay"></div>
          <h6 class="card-front-title heading heading-medium">
            {{ article.title }}
          </h6>
          <div class="card-hover">
            <h6 class="card-hover-title heading heading-medium">
              {{ article.title }}
            </h6>
            <summary class="card-hover-description heading heading-small">
              {{ article.description }}
            </summary>
          </div>
        </div> -->
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { StyleValue } from "@vue/runtime-dom";

interface Article {
  imageUrl: string;
  title: string;
  description: string;
}

interface MetaArticle extends Article {
  aspect: string;
  width: number;
  height: number;
  path: string;
  style: StyleValue;
}

const articles: Article[] = (
  (await $fetch("http://localhost:3000/images")) as { data: Article[] }
)?.data;

const decodedData = ref<MetaArticle[]>();
const isLoading = ref(false);

async function getMeta(url: string) {
  const img = new Image();
  img.src = url;
  await img.decode();
  return img;
}

function GCD(a: number, b: number): number {
  return b == 0 ? a : GCD(b, a % b);
}

onMounted(async () => {
  isLoading.value = true;
  decodedData.value = await Promise.all(
    articles.map(async (article) => {
      const blob = await fetch(article.imageUrl).then((response) =>
        response.blob()
      );
      const objectUrl = URL.createObjectURL(blob);
      const img = await getMeta(objectUrl);
      const imageSizes = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
      const divisor = GCD(imageSizes.width, imageSizes.height);
      const aspectRation = `${imageSizes.width / divisor}/${
        imageSizes.height / divisor
      }`;
      const imageStyle: StyleValue = {
        width: `100%`,
        aspectRatio: aspectRation,
      };
      return {
        path: objectUrl,
        ...imageSizes,
        ...article,
        aspect: aspectRation,
        style: imageStyle,
      };
    })
  );
  console.log(decodedData.value);
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.image-grid {
  margin: 98px 71px;
  display: grid;
  width: calc(100vw - 71px - 71px);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.image-grid:nth-child(1) {
  grid-column: span 4;
  grid-row: span 2;
}

.image-grid:nth-child(2),
.image-grid:nth-child(3) {
  grid-column: span 2;
}

.image-grid:nth-child(4),
.image-grid:nth-child(5) {
  grid-column: span 3;
}

.card {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
  position: relative;
  width: 100%;
  &-front {
    max-width: 100%;
    max-height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.25);
    &-image {
      max-width: 100%;
      max-height: 100%;
      width: fit-content;
    }
    &-overlay {
      background-color: var(--overlay-color);
      mix-blend-mode: multiply;
      opacity: 0.5;
      position: absolute;
      margin: 0;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    &-title {
      position: absolute;
      inset: 18px;
      margin: 0;
      width: 100%;
    }
  }
  &-hover {
    max-width: 100%;
    height: 100%;
    z-index: 1;
    &:hover {
      background-color: var(--connect-blue);
    }
    position: absolute;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    &:hover {
      opacity: 1;
    }
    &-title {
      display: block;
      padding: 18px;
      margin: 0;
    }
    &-description {
      word-wrap: break-word;
      padding: 18px;
      margin: 0;
    }
  }
}
</style>
