import * as dotenv from 'dotenv'
import users from './sampleData/sampleUsers.js'
import products from './sampleData/sampleProducts.js'
import { User, Product, Order } from '../../src/database/models/index.js'
import { connectDB } from '../../src/database/DatabaseConnector.js'

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
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

/**
 * Seed new data into the database.
 * This will populate a list of products and users.
 */
async function importData (): Promise<void> {
  try {
    await User.insertMany(users)
    await Product.insertMany(products)

    console.log('Data Imported!')
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

async function destroyAndImportData (): Promise<void> {
  await destroyData()
  await importData()
}

// Check command line args to just destroy data or destroy and import
void (process.argv[2] === '-d' ? destroyData() : destroyAndImportData())
