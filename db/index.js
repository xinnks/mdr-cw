const { insertDocuments } = require( "./insertDocuments");
const { deleteDocuments } = require( "./deleteDocuments");
const { updateDocument } = require( "./updateDocument");
const { findDocument } = require( "./findDocument");
const { fetchAllCollectionData } = require( "./fetchAllCollectionData");
const { countCollectionData } = require( "./countCollectionData");

module.exports = {
  insertDocuments,
  findDocument,
  deleteDocuments,
  updateDocument,
  fetchAllCollectionData,
  countCollectionData
}