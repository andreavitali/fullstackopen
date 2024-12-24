const loginWith = async (page, username, password) => {
  await page.getByText("log in").click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByText("login").click();
};

const createBlog = async (page, blog) => {
  await page.getByText("new blog").click();
  await page.getByPlaceholder("title").fill(blog.title);
  await page.getByPlaceholder("author").fill(blog.author);
  await page.getByPlaceholder("url").fill(blog.url);
  await page.getByText("add", { exact: true }).click();
};

export { loginWith, createBlog };
