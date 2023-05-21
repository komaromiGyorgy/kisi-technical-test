import { Article, Meta } from "~/types/article";

async function getMeta(url: string) {
  const img = new Image();
  img.src = url;
  await img.decode();
  return { width: img.naturalWidth, height: img.naturalHeight, type: "" };
}

const maxImageSizes = { width: 600, height: 400 };
const minImageSizes = { width: 350, height: 220 };
export async function getImageMeta(url: string) {
  const imageMeta = (await getMeta(url)) as Meta;
  if (!imageMeta) return { width: 310, height: 220, type: "" };
  const { meta } = applySizeConstraint({ meta: imageMeta } as Article);
  return meta;
}

export function applySizeConstraint(article: Article) {
  const isHorizontal = article.meta.width > article.meta.height;
  const ratio = isHorizontal
    ? article.meta.width / article.meta.height
    : article.meta.height / article.meta.width;
  if (
    article.meta.height > maxImageSizes.height ||
    article.meta.width > maxImageSizes.width
  ) {
    article.meta.width = maxImageSizes.width;
    article.meta.height = isHorizontal
      ? article.meta.width / ratio
      : article.meta.width * ratio;
  }

  if (
    article.meta.height < minImageSizes.height ||
    article.meta.width < minImageSizes.width
  ) {
    article.meta.width = minImageSizes.width;
    article.meta.height = isHorizontal
      ? article.meta.width / ratio
      : article.meta.width * ratio;
  }

  return article;
}

export async function uploadFileWithProgress(
  file: File,
  onProgress?: (progress: number) => void
) {
  const config = useRuntimeConfig();
  return new Promise<Article>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (e) =>
      onProgress?.(e.loaded / e.total)
    );
    xhr.addEventListener("load", () => {
      const res = xhr.response;
      try {
        const result = JSON.parse(res);
        if (result?.message) {
          throw new Error(result.message);
        }
        if (!result?.data) {
          throw new Error("File upload failed");
        }
        resolve(result.data);
      } catch (error) {
        reject(error);
      }
    });
    xhr.addEventListener("error", () => {
      reject(new Error("File upload failed"));
    });
    xhr.addEventListener("abort", () =>
      reject(new Error("File upload aborted"))
    );
    xhr.open("POST", `${config.public.apiUrl}images`, true);
    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  });
}
