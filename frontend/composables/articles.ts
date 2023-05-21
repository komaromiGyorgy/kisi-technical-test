import { Article } from "~/types/article";

export function useArticles() {
  const config = useRuntimeConfig();
  const isLoading = ref(false);
  const articles = ref<Article[]>([] as Article[]);
  const error = ref("");
  const loadError = ref("");

  const baseArticle: Article = {
    url: "",
    meta: { width: 0, height: 0, type: "" },
    title: "",
    description: "",
  };

  function setError(message: string) {
    error.value = message;
    setTimeout(() => {
      error.value = "";
    }, 30000);
  }

  async function loadArticles() {
    isLoading.value = true;
    loadError.value = "";
    try {
      const response = await $fetch<{ data: Article[] }>(`/images`, {
        method: "GET",
        baseURL: config.public.apiUrl,
      });
      articles.value = response.data.map(applySizeConstraint);
    } catch (error) {
      if (error instanceof Error) {
        loadError.value = error.message;
      } else {
        loadError.value = "Failed to load articles, please try again later!";
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function uploadFile(file: File) {
    let index = -1;
    try {
      error.value = "";
      if (!articles.value?.length) {
        articles.value = [];
      }
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size is too big, max allowed size is 10MB");
      }
      if (!file.type.startsWith("image/")) {
        throw new Error(
          "File is not an image, only .jpeg, .png and .gif files are allowed"
        );
      }

      const tempUrl = URL.createObjectURL(file);
      const newArticle = structuredClone(baseArticle);
      newArticle.meta = await getImageMeta(tempUrl);
      newArticle.url = tempUrl;
      newArticle.uploading = true;
      index = articles.value.push(applySizeConstraint(newArticle)) - 1;
      const result = await uploadFileWithProgress(file, (progress) => {
        if (articles.value?.length) {
          articles.value[index].progress = Math.round(progress * 100);
        }
      });
      if (articles.value?.length) {
        articles.value[index] = applySizeConstraint(result);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("File upload failed, please try again later!");
      }
      if (index != -1) {
        articles.value.splice(index, 1);
      }
    }
  }

  return {
    articles,
    error,
    loadError,
    isLoading,
    loadArticles,
    uploadFile,
  };
}
