const ghPages = require("gh-pages");

ghPages.publish("build", () => {
  console.info("published");
});
