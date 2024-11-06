require("dotenv").config();
const { DATABASE, POSTSTABLE, POSTELTABLE } = process.env;
const express = require("express");
const router = express.Router();
const pool = require("../pool");

// Queryes
function getAllPostsQuery(params) {
  return [
    `SELECT * FROM ${DATABASE}.${POSTSTABLE};`,
    [...Object.values(params)],
  ];
}

function getPostByIdQuery(params) {
  const { id } = params;
  try {
    return [
      `SELECT * FROM ${DATABASE}.${POSTSTABLE} 
      WHERE id=${id}`,
      [...Object.values(params)],
    ];
  } catch { err => console.log(err) }

}

function getPostByIdQueryWith(params) {
  const { id } = params;
  try {
    return [
      `SELECT * FROM ${DATABASE}.${POSTSTABLE}, ${DATABASE}.${POSTELTABLE} 
      WHERE id=post_id and id=${id}
      ORDER BY el_plaicement ASC;`,
      [...Object.values(params)],
    ];
  } catch { err => console.log(err) }

}

function addPostViewQuery(params, col) {
  const { id } = params;
  return [
    `UPDATE ${DATABASE}.${POSTSTABLE} SET ${col} = IFNULL(${col}, 0) + 1 WHERE id = ${id}`,
    [...Object.values(params)],
  ];
}

function createNewPostQuery(params) {
  const { post_title, post_img_url, post_description, created_date, reading_time } = params;
  return [
    `INSERT INTO ${DATABASE}.${POSTSTABLE} (post_title,post_img_url,post_description,created_date) 
    VALUES("${post_title}","${post_img_url}","${post_description}","${created_date}", "${reading_time}");`,
    [...Object.values(params)],
  ]
}

function addPostExtraQuery(params) {
  const { post_id, el_plaicement, el_type, el_value } = params;
  return [
    `INSERT INTO ${DATABASE}.${POSTELTABLE} (post_id,el_plaicement,el_type,el_value) 
    VALUES("${post_id}","${el_plaicement}","${el_type}","${el_value}");`,
    [...Object.values(params)],
  ]
}

function editPostQuery(params) {
  const { post_id, key, value } = params;
  return [
    `UPDATE ${DATABASE}.${POSTSTABLE} 
    SET ${key} = '${value}'
    WHERE id = ${post_id};`,
    [...Object.values(params)],
  ]
}

// Routes
router.post("/new", async (req, res, next) => {
  const [query, params] = createNewPostQuery(req.body);
  const result = await pool.execute(query, params);

  res.json(result[0]);
});

router.post("/edit", async (req, res, next) => {
  const [query, params] = editPostQuery(req.body);
  const result = await pool.execute(query, params);

  res.json(result[0]);
});

router.post("/add", async (req, res, next) => {
  const [query, params] = addPostExtraQuery(req.body);
  const result = await pool.execute(query, params);

  res.json(result[0]);
});

router.get("/posts", async (req, res, next) => {
  const [query, params] = getAllPostsQuery(req.query);
  const result = await pool.execute(query, params);

  res.json(result[0]);
});

router.get("/:action/:id", async (req, res, next) => {
  const { action } = req.params;

  if (action === "post") {
    const [query, params] = getPostByIdQueryWith(req.params);
    const result = await pool.execute(query, params);

    if (result[0].length < 1) {
      const [query2, params2] = getPostByIdQuery(req.params);
      const result2 = await pool.execute(query2, params2);
      res.json(result2[0]);
    } else res.json(result[0]);
  } else {

    let result;
    switch (action) {
      case "view": {
        const [query, params] = addPostViewQuery(req.params, "post_views");
        result = await pool.execute(query, params);
        break;
      }
      case "like": {
        const [query, params] = addPostViewQuery(req.params, "post_likes");
        result = await pool.execute(query, params);
        
        break;
      }
      case "tweet": {
        const [query, params] = addPostViewQuery(req.params, "post_tweets");
        result = await pool.execute(query, params);
        break;
      }
      case "share": {
        const [query, params] = addPostViewQuery(req.params, "post_shares");
        result = await pool.execute(query, params);
        break;
      }
      default:
        break;
    }
    res.json(result[0]);
  }
});

module.exports = router;