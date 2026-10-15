// Posts use the post layout and are only published when site.features.blog is true.
export default {
  layout: "layouts/post.njk",
  accent: "copper",
  eleventyComputed: {
    permalink: (data) => (data.site.features.blog ? `/blog/${data.page.fileSlug}/` : false),
  },
};
