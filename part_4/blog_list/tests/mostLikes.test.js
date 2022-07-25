const listHelper = require('../utils/list_helper');

describe('most likes', () => {
  const blogs = listHelper.blogs;
  const blogsV2 = listHelper.blogsV2;

  test('it returns an empty object for no blogs', () => {
    const result = listHelper.mostLikes([]);

    expect(result).toBe({});
  });
});
