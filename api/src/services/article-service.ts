import { Article, IResponse } from "../types";
import articleData from "../data/articles.json";
import path from "path";
import fs from "fs";

export class ArticleService {
  private articles: Article[] = articleData as Article[];

  public getEntries = (baseUrl: string): IResponse[] => {
    return fs.readdirSync("./src/images").map((file, index) => ({
      imageUrl: `${baseUrl}/images/${file}`,
      ...this.articles[index % this.articles.length],
    }));
  };

  public uploadFile = (
    baseUrl: string,
    file: Express.Multer.File
  ): IResponse => {
    const tempPath = file.path;
    const fileExtension = path.extname(file.originalname);
    const imageCount = fs.readdirSync("./src/images").length - 1;
    const fileName = `/images/image${imageCount}${fileExtension}`;
    const targetPath = path.join(__dirname, `..${fileName}`);

    fs.rename(tempPath, targetPath, (err) => {
      if (err) throw err;
    });
    return {
      imageUrl: `${baseUrl}${fileName}`,
      ...this.articles[imageCount % this.articles.length],
    };
  };
}
