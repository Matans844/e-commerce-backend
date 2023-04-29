// See: https://www.youtube.com/watch?v=FBZidnvNSUg
import { type Secret } from 'jsonwebtoken'

declare global{
  namespace NodeJS{
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      MONGO_URI: string
      PORT: number
      JWT_AUTH: Secret
    }
  }
}

export {}
