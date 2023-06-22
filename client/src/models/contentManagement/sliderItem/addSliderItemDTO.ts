export interface AddSliderItemDTO{
  sliderId: string | number;
  name: string;
  description: string | null;
  file: string | null;
  fileSavePath: string | null;
  fileExtension: string | null;
  linkUrl: string | null;
  linkTarget: string | null;
  priority: number | null;
}

