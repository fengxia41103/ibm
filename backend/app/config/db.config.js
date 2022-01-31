const { env } = process;

module.exports = {
  url: `mongodb://${env.APP_USERNAME}:${env.APP_PASSWORD}@mongo:27017/ibm`,
};
