import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("Blog component test", () => {
  let blog = {
    title: "Blog 1",
    author: "Andrea",
    url: "URL",
    likes: 1
  };

  test("renders title and authors but not url and likes", () => {
    const { container } = render(<Blog blog={blog} />);
    const element = screen.getByTestId("blog");
    expect(element).toBeDefined();
    const url = container.querySelector(".url");
    expect(url).toBeNull();
    const likes = container.querySelector(".likes");
    expect(likes).toBeNull();
  });

  test("clicking the view button shows details", async () => {
    const user = userEvent.setup();
    const { container } = render(<Blog blog={blog} />);
    const showButton = screen.getByText("Show");
    await user.click(showButton);

    const url = container.querySelector(".url");
    expect(url).toBeDefined();
    const likes = container.querySelector(".likes");
    expect(likes).toBeDefined();
  });

  test("clicking the like button twice calls the event handler prop twice", async () => {
    const user = userEvent.setup();
    const updateBlog = vi.fn();

    const { container } = render(<Blog blog={blog} updateBlog={updateBlog} />);

    const showButton = screen.getByText("Show");
    await user.click(showButton);

    const likeButton = container.querySelector("#like-button");
    screen.debug(likeButton);
    await user.click(likeButton);
    await user.click(likeButton);
    expect(updateBlog).toHaveBeenCalledTimes(2);
  });
});
