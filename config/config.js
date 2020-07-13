module.exports = {
  PORT: 5000,
  JWTSECRET: process.env.NODE_ENV === 'production' ? process.env.JWTSECRET : 'secret key string',
  MONGOURL:
    process.env.NODE_ENV === 'production'
      ? process.env.MONGOURL
      : 'mongodb+srv://admin:bzZ8888q@cluster0-dblwq.mongodb.net/shop',
  BASEURL: process.env.NODE_ENV === 'production' ? process.env.BASEURL : 'http://localhost:3000',
};
