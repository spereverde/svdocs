const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Copy `src/img/` to `dist/img`
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPlugin(syntaxHighlight);

  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
