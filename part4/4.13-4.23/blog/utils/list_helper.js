const lodash = require('lodash');


const dummy = (blogs) => {
    return 1
  }

const totalLikes = blogs => blogs.reduce((acc, blog) => {
return acc + blog.likes;
}, 0);

const favoriteBlog = blogs => {
    return blogs.sort((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = blogs => {
  const groupedByAuthor = lodash.groupBy(blogs, 'author');
  const authorEntries = lodash.entries(groupedByAuthor);
  const sortedByBlogCount = lodash.sortBy(authorEntries, entry => entry[1].length);
  const authorWithMostBlogs = lodash.last(sortedByBlogCount);

  return {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1].length
  };
}

const mostLikes = blogs => {
    const groupedByAuthor = lodash.groupBy(blogs, 'author');
    const authorEntries = lodash.entries(groupedByAuthor);
    const sortedByBlogLikes = lodash.sortBy(authorEntries, entry => lodash.reduce(entry[1], (acc, blog) => {
        return acc + blog.likes;
        }, 0));
        const authorWithMostLikes = lodash.last(sortedByBlogLikes);

    return {
        author: authorWithMostLikes[0],
        likes: lodash.reduce(authorWithMostLikes[1], (acc, blog) => { return acc + blog.likes }, 0)
        };

}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs,
    mostLikes
  }