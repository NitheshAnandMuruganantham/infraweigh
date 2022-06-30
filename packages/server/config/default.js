require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  port: process.env.PORT || 3000,
};
