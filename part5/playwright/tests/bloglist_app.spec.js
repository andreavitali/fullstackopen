const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helpers");

const user1 = {
  name: "User 1",
  username: "user-1",
  password: "pass1"
};

const user2 = {
  name: "User 2",
  username: "user-2",
  password: "pass2"
};

describe("Blog list app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", { data: user1 });
    await request.post("http://localhost:3003/api/users", { data: user2 });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, user1.username, user1.password);
      await expect(page.getByText(`${user1.name} logged in`)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, user1.username, "wrong");
      await expect(page.getByText("ERROR: Wrong credentials")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user1.username, user1.password);
    });

    test("a new blog can be created", async ({ page }) => {
      const blog = {
        title: "blog-1",
        author: "andrea",
        url: "blog url"
      };
      await createBlog(page, blog);
      await expect(page.getByText(`${blog.title} by ${blog.author}`)).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      const blog = {
        title: "blog-1",
        author: "andrea",
        url: "blog url"
      };
      await createBlog(page, blog);
      await page.getByText("Show").click();
      await expect(page.getByTestId("likes")).toContainText("0 likes");
      await page.getByText("like").click();
      await expect(page.getByTestId("likes")).toContainText("1 likes");
    });
  });

  describe("When logged in as creator of a blog", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user1.username, user1.password);
      const blog1 = {
        title: "blog-1",
        author: user1.name,
        url: "blog-1 url"
      };
      await createBlog(page, blog1);

      await page.getByText("logout").click();

      await loginWith(page, user2.username, user2.password);
      const blog2 = {
        title: "blog-2",
        author: user2.name,
        url: "blog-2 url"
      };
      await createBlog(page, blog2);
    });

    test("the blog can be removed", async ({ page }) => {
      const notMyBlog = page.getByTestId("blog").filter({ hasText: "blog-1" });
      await notMyBlog.getByText("Show").click();
      await expect(notMyBlog.getByRole("button", { name: "remove" })).not.toBeVisible();

      const myBlog = page.getByTestId("blog").filter({ hasText: "blog-2" });
      await myBlog.getByText("Show").click();
      const removeButton = myBlog.getByRole("button", { name: "remove" });
      await expect(removeButton).toBeVisible();
      await removeButton.click();

      await expect(page.getByText("different blog")).not.toBeVisible();
    });

    test.skip("blogs are in descending order by likes", async ({ page }) => {
      const blog1 = page.getByTestId("blog").filter({ hasText: "blog-1" });
      const blog2 = page.getByTestId("blog").filter({ hasText: "blog-2" });
      await blog1.getByText("Show").click();
      await blog2.getByText("Show").click();
      await blog1.getByRole("button", { name: "like" }).click();
      await blog2.getByRole("button", { name: "like" }).click();
      await blog2.getByRole("button", { name: "like" }).click();
      expect(blog1).toContainText("1 likes");
      expect(blog2).toContainText("2 likes");
      expect(page.getByTestId("blog").first()).toContainText("blog-2");
      expect(page.getByTestId("blog").last()).toContainText("blog-1");
    });
  });
});
