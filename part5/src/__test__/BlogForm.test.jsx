import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

describe("BlogForm component test", () => {
  let blog = {
    title: "Blog 1",
    author: "Andrea",
    url: "URL",
    likes: 1
  };

  test("form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const user = userEvent.setup();
    const createBlog = vi.fn();

    const { container } = render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByPlaceholderText("title");
    const authorInput = screen.getByPlaceholderText("author");
    const urlInput = screen.getByPlaceholderText("url");
    const createButton = screen.getByText("add");

    const title = "Blog1";
    const author = "Andrea";
    const url = "Blog1";
    await user.type(titleInput, title);
    await user.type(authorInput, author);
    await user.type(urlInput, url);

    await user.click(createButton);

    expect(createBlog).toHaveBeenCalledOnce();
    const createBlogCall = createBlog.mock.calls[0][0];
    expect(createBlogCall.title).toBe(title);
    expect(createBlogCall.author).toBe(author);
    expect(createBlogCall.url).toBe(url);
  });
});
