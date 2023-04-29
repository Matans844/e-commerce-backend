import * as dotenv from 'dotenv'
import users from './sampleData/sampleUsers.js'
import products from './sampleData/sampleProducts.js'
import { UserModel, ProductModel, Order } from '../src/database/models/index.js'
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
    await Order.deleteMany()
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
    await Order.deleteMany()
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

/* async function destroyAndSeedData (): Promise<void> {
  await destroyData()
  await importData()
  process.exit()
} */

// Check command line args to just destroy data or destroy and import
void (process.argv[2] === '-d' ? destroyData() : destroyAndImportData())
