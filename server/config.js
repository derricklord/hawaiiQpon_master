module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'A hard to guess string',
  MONGO_URI: process.env.MONGO_URI || 'hawaiiqpon.lordconsulting.net/couponSchema',
  MONGO_URI_LAB: process.env.MONGO_URI || 'mongodb://thisweek:Orderly123@ds037262.mongolab.com:37262/hawaiiqpons',
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '74e9df6985d40375953ba85fac9e6444',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'nSP5GwwoZdyrNsnKz8ovTt3l',
  //GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'pNHqiYYojPush7H5V1ZE-lx1'
};