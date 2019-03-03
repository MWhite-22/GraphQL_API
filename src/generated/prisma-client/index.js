'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
let prisma_lib_1 = require('prisma-client-lib');
let {typeDefs} = require("./prisma-schema");

let models = [
  {
    name: 'Link',
    embedded: false,
  },
  {
    name: 'User',
    embedded: false,
  },
  {
    name: 'Vote',
    embedded: false,
  },
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: 'https://us1.prisma.sh/mjw2291-3f6b6b/GraphQL_API/dev',
});
exports.prisma = new exports.Prisma();
