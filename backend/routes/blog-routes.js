
const requireLogin = require('../_common/middlewares/require-login');

const Blog = require('../business/Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, (req, res) => {
    const blog = Blog.findById(req.params.id);
    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const blogs = Blog.findAllByUser(req.user.id);
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content, imagePath } = req.body;

    try {
      const blog = Blog.add({ title, content, imagePath, userId: req.user.id })
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
