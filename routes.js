const express = require('express');

const mainRouter = express.Router({ mergeParams: true });
const DocumentController= require('./document/controller/document.controller');
mainRouter.get('/api/documents',DocumentController.getAll);
mainRouter.get('/api/documents/:bookId',DocumentController.getDocumentDetails);

mainRouter.post('/api/documents',DocumentController.addDocument);

mainRouter.post('/api/documents/:bookId',DocumentController.addPageToDocument);

mainRouter.delete('/api/documents/:bookId',DocumentController.deletBook);


module.exports = mainRouter;
