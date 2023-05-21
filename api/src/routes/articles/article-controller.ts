import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../../services/article-service";

export class ArticleController {
  private articleService = new ArticleService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      res
        .status(200)
        .json({ data: await this.articleService.getEntries(baseUrl) });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      if (!file) {
        return res.status(422).json({
          error: "A file must be provided",
        });
      }
      res
        .status(201)
        .json({ data: await this.articleService.uploadFile(baseUrl, file) });
    } catch (error) {
      next(error);
    }
  };
}

export default new ArticleController();
