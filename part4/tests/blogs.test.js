const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0
  }
];

const biggerBlogList = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
];

const evenBiggerBlogList = [
  ...biggerBlogList,
  {
    id: "6701c8c30ad831d354090981",
    title: ".NET Weekly",
    author: "Edsger W. Dijkstra",
    url: "http://net-weekly.com",
    likes: 3
  }
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(biggerBlogList);
    assert.strictEqual(result, 12);
  });
});

describe("favorite blog", () => {
  test("returns empty object for empty list", () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, {});
  });

  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, listWithOneBlog[0]);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(biggerBlogList);
    assert.deepStrictEqual(result, biggerBlogList[0]);
  });
});

describe("most blogs", () => {
  test("returns empty object for empty list", () => {
    const result = listHelper.mostBlogs([]);
    assert.deepStrictEqual(result, {});
  });

  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const expected = { author: "Edsger W. Dijkstra", blogs: 1 };
    assert.deepStrictEqual(result, expected);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostBlogs(evenBiggerBlogList);
    const expected = { author: "Edsger W. Dijkstra", blogs: 2 };
    assert.deepStrictEqual(result, expected);
  });
});

describe("most likes", () => {
  test("returns empty object for empty list", () => {
    const result = listHelper.mostLikes([]);
    assert.deepStrictEqual(result, {});
  });

  test("when list has only one blog, equals that blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const expected = { author: "Edsger W. Dijkstra", likes: 5 };
    assert.deepStrictEqual(result, expected);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(biggerBlogList);
    const expected = { author: "Michael Chan", likes: 7 };
    assert.deepStrictEqual(result, expected);
  });
});
