export type ImageResult = {
  is_product: false;
  link: string;
  original: string;
  original_height: number;
  original_width: number;
  position: number;
  related_content_id: string;
  serpapi_related_content_link: string;
  source: string;
  source_logo: string;
  thumbnail: string;
  title: string;
};

export type SerpAPIImageResponse = {
  images_results: ImageResult[];
  suggested_searches: { name: string }[];
};
