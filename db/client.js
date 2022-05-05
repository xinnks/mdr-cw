const faunadb = require('faunadb');
const { getFaunaError } = require('./db-utils.js');
const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET
})
const {Create, Collection, Match, Index, Get, Ref, Paginate, Sum, Delete, Add, Select, Let, Var, Count, Update} = faunadb.query;

module.exports = {
  Create, Collection, Match, Index, Get, Ref, Paginate, Sum, Delete, Add, Select, Let, Var, Count, Update, faunaClient, getFaunaError
}