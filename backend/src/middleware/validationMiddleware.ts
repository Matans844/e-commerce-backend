import {NextFunction} from "../types/index.js";

const validatePage = (req: Request, res: Response, next: NextFunction) => {
    const pageInput = req.query.pageInput;
    const page = parseInt(pageInput as string);

    if (pageInput !== undefined && (isNaN(page) || page <= 0)) {
        return res.status(400).json({ message: 'Invalid page number' });
    }

    next();
};

const validateId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid ID');
    }

    switch (true) {
        case /\/products\/\w+/.test(req.path):
            const product = await ProductModel.findById(id);
            if (!product) {
                res.status(404);
                throw new Error('Product not found');
            }
            break;
        case /\/users\/\w+/.test(req.path):
            const user = await UserModel.findById(id);
            if (!user) {
                res.status(404);
                throw new Error('User not found');
            }
            break;
        default:
            res.status(400);
            throw new Error('Invalid route');
    }

    next();
});

export {validatePage, validateId}