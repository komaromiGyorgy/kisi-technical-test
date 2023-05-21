<template>
  <div
    class="article"
    :style="{
      '--hover-color': getRandomColor(),
    }"
  >
    <transition name="fade">
      <div class="article-front">
        <img
          :src="article.url"
          :alt="toKey(article.title)"
          :width="article.meta.width"
          :height="article.meta.height"
          class="article-front-image"
        />
        <div class="article-front-overlay"></div>
        <div class="article-front-title">
          <h6 class="article-front-title-inner custom-font heading-small">
            {{ article.title }}
          </h6>
        </div>
        <div class="article-hover">
          <h6 class="article-hover-title custom-font heading-small">
            {{ article.title }}
          </h6>
          <summary class="article-hover-description custom-font text-small">
            {{ article.description }}
          </summary>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <Spinner
        v-if="article.uploading"
        :progress="article.progress"
        :style="{ position: 'absolute', inset: '0px' }"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Article } from "~/types/article";
defineProps<{
  article: Article;
}>();
</script>

<style scoped lang="scss">
.article {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  border-radius: 4px;
  position: relative;
  width: 100%;
  overflow: hidden;
  &-front {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.25);
    &-image {
      max-width: 100%;
      object-fit: cover;
      width: 100%;
      height: 100%;
      @media screen and (max-width: 950px) {
        width: 100% !important;
        object-fit: cover;
      }
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
      inset: 0;
      margin: 0;
      width: 100%;
    }
    &-title {
      max-width: 100%;
      height: 100%;
      width: 100%;
      &-inner {
        display: block;
        padding: 18px;
        margin: 0;
      }
    }
  }
  &-hover {
    max-width: 100%;
    height: 100%;
    width: 100%;
    z-index: 1;
    &:hover {
      background-color: var(--hover-color);
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
