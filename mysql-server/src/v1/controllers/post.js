const { database } = require("../models/sql"); //mysqlに接続するためのインストール

exports.create = async (req, res) => {
  console.log(req.body);
  try {
    const username = req.user[0].name;
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;

    const sql = "INSERT INTO posts (category,postUserName,title,description) VALUES (?, ?, ?, ?)";
    const params = [category, username, title, description];
    await database().query(sql, params, (err, rows, results) => {
      if (err) throw err;
      console.log("投稿を保存しました");
      res.status(201).json(rows);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const sql = "SELECT * FROM posts ORDER BY timeline DESC";
    await database().query(sql, (err, posts, results) => {
      if (err) throw err;
      res.status(201).json(posts);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  const { postId } = req.params;
  try {
    const sql = "SELECT * FROM posts  WHERE postId = ?";
    await database().query(sql, [postId], (err, rows, results) => {
      //console.log(rows);
      if (err) throw err;
      res.status(201).json(rows[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
