const documentRepository = require("../repo/document.repository");

class DocumentController {
  static async getAll(req, res) {
    const documents = await documentRepository.getAll();
    // return res.status(documents.statusCode).json(documents);
    return res.json(documents);
  }

  static async getDocumentDetails(req, res) {
    const { bookId } = req.params;
    const documents = await documentRepository.getDocumentDetails(bookId);
    // return res.status(documents.statusCode).json(documents);
    return res.json(documents);
  }
  static async addDocument(req, res) {
    const { body } = req;

    if (body && body.title && body.author && body.title.length > 0 && body.author.length > 0) {
      const response = await documentRepository.addDocument(body);
      if (response &&response.statusCode === 200) {
        return res.json(response);
      } else {
       
      }
    }
   
    return res.status(400).send({
      message: "data is not complete!",
    });
  }
  static async addPageToDocument(req, res) {
    const { body } = req;
    const { bookId } = req.params;

    const response = await documentRepository.addPageToBook(bookId, body);
    // return res.status(documents.statusCode).json(documents);
    if (response.statusCode === 200) {
      return res.json(response);
    } else {
      return res.status(400).send({
        message: response.message,
      });
    }
  }

  static async deletBook(req, res) {
    const { bookId } = req.params;

    const response = await documentRepository.deletBook(bookId);
    // return res.status(documents.statusCode).json(documents);
    if (response.statusCode === 204) {
      return res.json(response);
    } else {
      return res.status(400).send({
        message: response.message,
      });
    }
  }

}




module.exports = DocumentController;
