/**
 * Establishes a connection to the MongoDB database.
 * @module database/connection
 */

const mongoose = require('mongoose')

/**
 * The URL of the MongoDB database.
 * @type {string}
 */
const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/reservationDB'

/**
 * Connects to the MongoDB database.
 * @async
 * @throws {Error} If there is an error connecting to the database.
 */
module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl)
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}