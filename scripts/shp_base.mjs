//const fs = require("fs");
const yaml = require("yaml");
require("@shopify/shopify-api/adapters/node");
const { shopifyApi, ApiVersion, Session } = require("@shopify/shopify-api");
const { restResources } = require("@shopify/shopify-api/rest/admin/2023-04");

async function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const shopify = shopifyApi({
  apiSecretKey: "73427d28ca1bd53e423b972c258bf59b", // Note: this is the API Secret Key, NOT the API access token
  apiVersion: ApiVersion.April23,
  isCustomStoreApp: true, // this MUST be set to true (default is false)
  adminApiAccessToken: "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", // Note: this is the API access token, NOT the API Secret Key
  isEmbeddedApp: false,
  hostName: "kioskarchive.myshopify.com",
  restResources,
});

const session = shopify.session.customAppSession("kioskarchive.myshopify.com");

const getAll = async (method, session) => {
  let pageInfo = null;
  let all = [];
  do {
    await delay(600);
    var response = await shopify.rest[method].all({
      ...pageInfo?.nextPage?.query,
      session,
      limit: 150,
    });
    var page = response.data;
    all = all.concat(page);
    pageInfo = response.pageInfo;
    console.log(all.length);
  } while (pageInfo?.nextPage);
  return all;
};

export  {getAll, session};

// var Products = await getAll("Product", session);
// var Collections = await getAll("Collection", session);
// var Collects = await getAll("Collect", session);
