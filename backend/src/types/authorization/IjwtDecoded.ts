import { type JwtPayload } from 'jsonwebtoken'

export interface Decoded extends JwtPayload {
  id: string
  iat: number
  exp: number
}
