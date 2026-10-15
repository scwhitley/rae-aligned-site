// The blog page is only published when site.features.blog is true.
export default {
  eleventyComputed: {
    permalink: (data) => (data.site.features.blog ? "/blog/" : false),
  },
};
