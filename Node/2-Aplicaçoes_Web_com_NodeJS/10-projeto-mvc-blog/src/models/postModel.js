let posts = [
  {
    id: "1",
    title: "Teste - one",
    content: "kadoakdhadsdapsdjasjdka",
    createdAt: new Date(),
    updatePost: new Date(),
  },
  {
    id: "2",
    title: "Teste - two",
    content: "kadoakdhadsdapsdjasjdka",
    createdAt: new Date(),
    updatePost: new Date(),
  },
];

// Post {id, title, content, createdAt, updateAt}

const postModel = {
  getAllPosts() {
    return posts;
  },

  getPostById(id) {
    return posts.find((post) => post.id === id);
  },

  createPost(title, content) {
    const post = {
      id: Date.now().toString(),
      title: title,
      content: content,
      createdAt: new Date(),
      updatedAt: new Date(), // Fixed typo
    };
    return post;
  },

  savePost(post) {
    posts.unshift(post);
  },

  updatePost(id, updatePost) {
    const index = posts.findIndex((post) => post.id === id);
    posts[index] = {...posts[index], ...updatePost, updateAt: new Date()};
  },

  deletePost(id) {
    posts = posts.filter((post) => post.id !== id);
  },
};

module.exports = postModel;
