// Eleventy builds the plain HTML site from src/ into _site/ (Netlify runs this on every push).
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({
    "src/favicon.ico": "favicon.ico",
    "src/favicon-32x32.png": "favicon-32x32.png",
    "src/favicon-192x192.png": "favicon-192x192.png",
    "src/favicon-512x512.png": "favicon-512x512.png",
    "src/apple-touch-icon.png": "apple-touch-icon.png",
    "src/robots.txt": "robots.txt",
  });

  // Blog posts live in src/blog/posts/*.md (none at launch).
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/posts/*.md").reverse()
  );

  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
