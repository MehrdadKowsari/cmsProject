import { PostTypeEnum } from "src/enums/contentManagement/postTypeEnum";

export interface AddPostDTO{
  galleryCategoryId: string;
  name: string;
  description: string | null;
  params: string | null;
  type: PostTypeEnum;
  image: string | null;
  thumbnailImage: string | null;
  slugUrl: string | null;
  allowedFileExtension: string | null;
  priority: number | number;
  locale: string | null;
}

