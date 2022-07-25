const listHelper = require('../utils/list_helper');

describe('most blogs', () => {
  const blogs = listHelper.blogs;
  const blogsV2 = listHelper.blogsV2;
  test('it return an empty object for no blogs', () => {
    const result = listHelper.mostBlogs([]);

    expect(result).toBe('');
  });

  test('it produces the correct result for equal posts: {author: ..., blogs: ...}', () => {
    const result = listHelper.mostBlogs(blogs);

    expect(result).toStrictEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 3,
    });
  });

  test('it produces the correct result for more posts: {author: ..., blogs: ...}', () => {
    const result = listHelper.mostBlogs(blogsV2);

    expect(result).toStrictEqual({
      author: 'Robert C. Martin',
      blogs: 4,
    });
  });
});
