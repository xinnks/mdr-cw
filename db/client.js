const faunadb = require('faunadb');
const { getFaunaError } = require('./db-utils.js');
const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET
})
const {Create, Collection, Match, Map, Index, Get, Ref, Paginate, Lambda, Sum, Delete, Add, Select, Let, Var, Count, Update} = faunadb.query;

module.exports = {
  Create, Collection, Match, Map, Index, Get, Ref, Paginate, Lambda, Sum, Delete, Add, Select, Let, Var, Count, Update, faunaClient, getFaunaError
}