import { Article, IResponse, Meta } from "../types";
import articleData from "../data/articles.json";
import fs from "fs/promises";
import { comapreByFileName, getFileSize, getImagesLength } from "../utils";

const IMAGES_PATH = "./src/images";

export class ArticleService {
  private articles: Article[] = articleData as Article[];

  public getEntries = async (baseUrl: string) => {
    const files = await fs
      .readdir(IMAGES_PATH)
      .then((files) => files.sort(comapreByFileName));

    return Promise.all(
      files.map(async (file, index) => {
        const imageMeta = await getFileSize(`${IMAGES_PATH}/${file}`);

        return {
          url: `${baseUrl}/images/${file}`,
          meta: imageMeta,
          ...this.articles[index % this.articles.length],
        };
      })
    );
  };

  public uploadFile = async (
    baseUrl: string,
    file: Express.Multer.File
  ): Promise<IResponse> => {
    const fileName = `/images/${file.filename}`;
    const imageCount = await getImagesLength();
    const imageMeta = await getFileSize(`${IMAGES_PATH}/${file.filename}`);

    return {
      url: `${baseUrl}${fileName}`,
      meta: imageMeta as unknown as Meta,
      ...this.articles[(imageCount - 1) % this.articles.length],
    };
  };
}
