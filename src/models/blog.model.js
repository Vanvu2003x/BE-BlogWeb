const pool = require('../config/db');

async function addBlog(blog) {
  const res = await pool.query(
    "INSERT INTO blogs(title, author_id, content, img_url, video_url) VALUES ($1, $2, $3, $4, $5)",
    [blog.title, blog.author_id, blog.content, blog.img_url, blog.video_url]
  );
  return res.rowCount;  // trả về số dòng bị ảnh hưởng
}


async function getAllBlog() {
  const res = await pool.query("SELECT * FROM blogs");
  return res.rows;
}

async function getBlogbyUserID(user_id) {
  const res = await pool.query("SELECT * FROM blogs WHERE author_id = $1", [user_id]);
  return res.rows;
}

async function updateBlog(newBlog) {
  const setClauses = [];
  const values = [];
  let idx = 1;

  if (newBlog.content !== undefined) {
    setClauses.push(`content = $${idx++}`);
    values.push(newBlog.content);
  }
  if (newBlog.title !== undefined) {
    setClauses.push(`title = $${idx++}`);
    values.push(newBlog.title);
  }
  if (newBlog.img_url !== undefined) {
    setClauses.push(`img_url = $${idx++}`);
    values.push(newBlog.img_url);
  }
  if (newBlog.video_url !== undefined) {
    setClauses.push(`video_url = $${idx++}`);
    values.push(newBlog.video_url);
  }

  if (setClauses.length === 0) {
    return 0;
  }

  setClauses.push(`update_at = CURRENT_TIMESTAMP`);

  values.push(newBlog.author_id);
  values.push(newBlog.blog_id);

  const sql = `
    UPDATE blogs
    SET ${setClauses.join(', ')}
    WHERE author_id = $${idx++} AND blog_id = $${idx}
  `;

  const res = await pool.query(sql, values);
  return res.rowCount;
}


async function deleteBlog(blog) {
  const res = await pool.query(
    "DELETE FROM blogs WHERE blog_id = $1 AND author_id = $2",
    [blog.blog_id, blog.author_id]
  );
  return res.rowCount;
}

module.exports = { addBlog, getAllBlog, getBlogbyUserID, updateBlog, deleteBlog };
