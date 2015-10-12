module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'A hard to guess string',
  MONGO_URI: process.env.MONGO_URI || '104.236.59.254/couponSchema',
  MONGO_URI_LAB: process.env.MONGO_URI_LAB || 'mongodb://thisweek:Orderly123@ds037262.mongolab.com:37262/hawaiiqpons',
  MONGO_URI_LOCAL: process.env.MONGO_URI_LOCAL || 'localhost/couponSchema',
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '74e9df6985d40375953ba85fac9e6444',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET_DEV || 'js29z4mty0HOUAHWfRvVdQSW'
};