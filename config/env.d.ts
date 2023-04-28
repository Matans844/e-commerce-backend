// See: https://www.youtube.com/watch?v=FBZidnvNSUg

declare global{
  namespace NodeJS{
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      MONGO_URI: string
      PORT: number
    }
  }
}

export {}
