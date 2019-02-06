
const requireLogin = require('../_common/middlewares/require-login');

const Blog = require('../business/Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    console.log('step1');
    const blogs = await Blog.findAllByUser(req.user.id);
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {


    const { title, content, imagePath } = req.body;

    try {
      const blog = await Blog.add({ title, content, imagePath, userId: req.user.id });
      console.log(blog);
      res.send(blog);
    } catch (err) {

      res.status(400).send(err);
    }
  });
};
