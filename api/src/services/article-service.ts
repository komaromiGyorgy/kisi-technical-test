import { Article, IResponse, Meta } from "../types";
import articleData from "../data/articles.json";
import fs from "fs/promises";
import {
  comapreByFileName,
  getFileSize,
  getImagesLength,
  iamgesPath,
} from "../utils";

export class ArticleService {
  private articles: Article[] = articleData as Article[];

  public async getEntries(baseUrl: string) {
    const files = await fs
      .readdir(iamgesPath)
      .then((files) => files.sort(comapreByFileName));

    return Promise.all(
      files.map(async (file, index) => {
        const imageMeta = await getFileSize(`${iamgesPath}/${file}`);

        return {
          url: `${baseUrl}/images/${file}`,
          meta: imageMeta,
          ...this.articles[index % this.articles.length],
        };
      })
    );
  }

  public async uploadFile(
    baseUrl: string,
    file: Express.Multer.File
  ): Promise<IResponse> {
    const fileName = `/images/${file.filename}`;
    const imageCount = await getImagesLength();
    const imageMeta = await getFileSize(`${iamgesPath}/${file.filename}`);

    return {
      url: `${baseUrl}${fileName}`,
      meta: imageMeta as unknown as Meta,
      ...this.articles[(imageCount - 1) % this.articles.length],
    };
  }

  public async reset() {
    const files = await fs
      .readdir(iamgesPath)
      .then((files) => files.sort(comapreByFileName));
    const filesToDelete = files.slice(7);
    return Promise.all(
      filesToDelete.map((file) => fs.unlink(`${iamgesPath}/${file}`))
    );
  }
}
