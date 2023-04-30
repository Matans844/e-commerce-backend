import { type Request, type Response, type NextFunction } from '../types/index.js'

const validatePage = (req: Request, res: Response, next: NextFunction): void => {
  const pageInput = req.query.pageInput
  const page = parseInt(pageInput as string)

  if (pageInput !== undefined && (isNaN(page) || page <= 0)) {
    throw new Error('Invalid page number')
  }

  next()
}

export { validatePage }
