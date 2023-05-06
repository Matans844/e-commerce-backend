import * as dotenv from 'dotenv'
import users from './sampleData/sampleUsers.js'
import products from './sampleData/sampleProducts.js'
import { UserModel, ProductModel, OrderModel, CartModel } from '../src/database/models/index.js'
import { connectDB } from '../src/database/DatabaseConnector.js'

/**
 * Helper file that is used for adding and removing test data to the database.
 */

dotenv.config()

void connectDB()

/**
 * Destroy all data on the database
 */
async function destroyData (): Promise<void> {
  try {
    // Clear any existing items from DB
    await OrderModel.deleteMany()
    await CartModel.deleteMany()
    await ProductModel.deleteMany()
    await UserModel.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting from database: ${error.message}`)
    } else {
      console.error('Unknown error')
    }
    process.exit(1)
  }
}

/*
async function importData (): Promise<void> {
  try {
    // Add data to DB
    await User.insertMany(users)
    await Product.insertMany(products)

    console.log('Data Imported!')
    process.exit()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error importing to database: ${error.message}`)
    } else {
      console.error('Unknown error')
    }
    process.exit(1)
  }
}
 */

/**
 * Seed new data into the database.
 * This will populate a list of products and users.
 */
async function destroyAndImportData (): Promise<void> {
  try {
    // Clear any existing items from DB
    // await OrderModel.deleteMany()
    await CartModel.deleteMany()
    await ProductModel.deleteMany()
    await UserModel.deleteMany()

    console.log('Data Destroyed!')

    // Add data to DB
    await UserModel.insertMany(users)
    await ProductModel.insertMany(products)

    console.log('Data Imported!')
    process.exit()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error importing to database: ${error.message}`)
    } else {
      console.error('Unknown error')
    }
    process.exit(1)
  }
}

async function destroyDataAndCreateAndImport (): Promise<void> {
  try {
    // Clear any existing items from DB
    // await OrderModel.deleteMany()
    await CartModel.deleteMany()
    await ProductModel.deleteMany()
    await UserModel.deleteMany()

    console.log('Data Destroyed!')

    // Create data and add to DB
    for (const userData of users) {
      const user = await UserModel.create(userData)
      await user.save()
    }

    for (const productData of products) {
      const product = await ProductModel.create(productData)
      await product.save()
    }

    console.log('Data Imported!')
    process.exit()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error importing to database: ${error.message}`)
    } else {
      console.error('Unknown error')
    }
    process.exit(1)
  }
}

/* async function destroyAndSeedData (): Promise<void> {
  await destroyData()
  await importData()
  process.exit()
} */

// Check command line args to just destroy data or destroy and import
switch (process.argv[2]) {
  case '-d':
    void destroyData()
    break
  case '-i':
    void destroyAndImportData()
    break
  default:
    void destroyDataAndCreateAndImport()
    break
}

// void (process.argv[2] === '-d' ? destroyData() : destroyAndImportData())

/*
From ChatGPt3.5:
When using `insertMany` with Mongoose, the documents are inserted directly into the database,
without being subject to middleware or validation.
This can be faster than creating and saving individual documents in some cases,
but it also means that the `pre` and `post` middleware hooks are not executed, and validation is not performed.
If you need these features, you should create and save each document individually using the `save()` method.
 */
