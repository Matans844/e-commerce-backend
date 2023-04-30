import jwt from 'jsonwebtoken'

/**
 * Generate a json web token for a user
 * @param id The id of the user
 */
function generateAuthToken (id: string): string {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export default generateAuthToken
