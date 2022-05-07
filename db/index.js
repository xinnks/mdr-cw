const { insertDocument } = require( "./insertDocument");
const { insertDocuments } = require( "./insertDocuments");
const { deleteDocument } = require( "./deleteDocument");
const { deleteDocuments } = require( "./deleteDocuments");
const { updateDocument } = require( "./updateDocument");
const { findDocument } = require( "./findDocument");
const { findDocuments } = require( "./findDocuments");
const { fetchAllCollectionData } = require( "./fetchAllCollectionData");
const { countCollectionData } = require( "./countCollectionData");

module.exports = {
  insertDocument,
  insertDocuments,
  findDocument,
  findDocuments,
  deleteDocument,
  deleteDocuments,
  updateDocument,
  fetchAllCollectionData,
  countCollectionData
}