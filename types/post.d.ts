export type Post = {
  slug: string,
  content: string,
  data: {
    [key: string]: any,
  }
}