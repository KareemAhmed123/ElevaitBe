const Document = require("../model/document.model");
const Page = require('../model/page.model');

class DocumentRepository {
    static async getAll() {
        const documents = await Document.find();
        return { documents, statusCode: 200 };
    }

    static async getDocumentDetails(id) {
        const document = await Document.findById({ _id: id }).populate('pages').lean();
        return { document, statusCode: 200 };
    }

    static async addDocument(body) {
        try {
            const book = new Document(body);
            const newBook = await book.save();
            return { statusCode: 200, book: newBook }
        } catch (err) {
            return { statusCode: 400, message: err };
        }
    }

    static async addPageToBook(bookId, body) {
        try {
            const { pageNr } = body;

            const book = await Document.findById(bookId).populate({ path: 'pages', select: 'pageNr', match: { pageNr } });
            if (!book) {
                return {
                    statusCode: "404",
                    message: "book not found",
                };
            }
            if (book.pages && book.pages.length > 0) {
                return {
                    statusCode: "404",
                    message: "there is a page with this number",
                };
            }
            const page = new Page(body);
            await page.save();

            book.pages.push(page._id);

            await book.save();
            return { statusCode: 200, book };
        } catch (err) {
            return { statusCode: 400, message: err };
        }
    }

    static async deletBook(bookId) {
        try {

            const book = await Document.findById(bookId);
            await Page.deleteMany({ _id: { $in: book.pages } });
            await Document.deleteOne({ _id: bookId });
            return { statusCode: 204 };
        } catch (err) {
            return { statusCode: 400, message: err };
        }
    }
}


module.exports = DocumentRepository;
