const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMoreBlogs = listHelper.blogs;

  test('when list has one blog, it equals the number of likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has more blogs, it adds the likes of all of them', () => {
    const result = listHelper.totalLikes(listWithMoreBlogs);
    expect(result).toBe(56);
  });

  test('when list is empty, it equals zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});
