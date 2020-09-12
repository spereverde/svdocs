module.exports = function (eleventyConfig) {
  // Copy `src/img/` to `dist/img`
  eleventyConfig.addPassthroughCopy("img");

  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
