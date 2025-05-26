const blogModel = require('../models/blog.model');
async function addBlog(req, res) {
  let data = req.body;

  if (data.data && typeof data.data === 'string') {
      data = JSON.parse(data.data);
  }

  if (!data.title || !data.content) {
    return res.status(400).json({ error: 'Missing title or content' });
  }

  const blog = {
    title: data.title,
    content: data.content,
    author_id: req.user_id,
    img_url: [],
    video_url: []
  };

  if (req.files && req.files.length > 0) {
    console.log(req.files)
    req.files.forEach(file => {
      const url = '/uploads/' + file.filename;
      if (file.mimetype.startsWith("image/")) {
        blog.img_url.push(url);
      } else if (file.mimetype.startsWith("video/")) {
        blog.video_url.push(url);
      }
    });
  }

  try {
    const query = await blogModel.addBlog(blog);
    if (query > 0) {
      return res.json({ message: "Upload thành công", data: blog });
    } else {
      return res.status(400).json({ message: "Thêm bài viết thất bại" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


async function getAllBlogs(req, res) {
  try {
    const blogs = await blogModel.getAllBlog();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteBlog(req,res) {
    try {
        const del = await blogModel.deleteBlog({blog_id:req.params.blog_id,author_id:req.user_id})
        if(del>0){
            res.json({message:"Xóa thành công"})
        }
        else
            res.json({message:"Không p author k thể xóa đc bài viết"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

async function getBlogbyUserID(req,res) {
    try {
        const user_id = req.params.user_id;
        const blogs = await blogModel.getBlogbyUserID(user_id)
        res.json(blogs)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

async function updateBlog(req,res) {
    const user_id = req.user_id;
    const data = req.body;
    if(typeof data=='string'){
      data = JSON.parse(data.data);
    }

    const blog_id = req.params.blog_id;

    const newBlog = {
        ...data,
        author_id:user_id,
        blog_id,
        img_url: [],
        video_url: []
    }

    if (req.files && req.files.length > 0) {
      console.log(req.files)
      req.files.forEach(file => {
        const url = '/uploads/' + file.filename;
        if (file.mimetype.startsWith("image/")) {
          newBlog.img_url.push(url);
        } else if (file.mimetype.startsWith("video/")) {
          newBlog.video_url.push(url);
        }
      });
    }
    try {
        const query = await blogModel.updateBlog(newBlog)
        if(query>0)
            res.json({message:"Cập nhật thành công"})
        else
            res.json({message:"Không p author k thể cập nhật đc bài viết"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
module.exports = { addBlog, getAllBlogs,deleteBlog,deleteBlog,updateBlog,getBlogbyUserID };
