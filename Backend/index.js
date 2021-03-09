const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = 3000;

app.use(
  cookieSession({
    name: "session",
    keys: ["1234", "abcd"],
  })
);

app.get("/", function (req, res, next) {
  // Update views
  req.session.views = req.session.views || 0;

  // Write response
  res.end(req.session.views + " views");
  // console.log(req.session);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
