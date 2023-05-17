import { Article } from "../types";
import articleData from "../../../data/articles.json";

const articles: Article[] = articleData as Article[];

export const getEntries = (): Article[] => articles;
