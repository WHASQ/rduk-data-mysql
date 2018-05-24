/**
 * MIT License
 *
 * Copyright (c) 2016 - 2018 RDUK <tech@rduk.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict'

const errors = require('@rduk/errors')
const MySQLConnectionInfo = require('./connectionInfo')
const mysql = require('mysql')

let databases = new Map()

class MySQLDatabase {
  constructor (pool) {
    this.pool = pool
  }
  execute (command, parameters) {
    return new Promise((resolve, reject) => {
      this.pool.query(command, parameters, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
  dispose () {
    this.pool.release()
  }

  static create (connection) {
    if (connection instanceof MySQLConnectionInfo !== true) {
      errors.throwArgumentError('connection', connection)
    }

    let pool = mysql.createPool({
      user: connection.user,
      password: connection.password,
      host: connection.host,
      port: connection.port,
      database: connection.db,
      connectionLimit: connection.limit
    })

    return new MySQLDatabase(pool)
  }
  static get (connection) {
    if (connection instanceof MySQLConnectionInfo !== true) {
      errors.throwArgumentError('connection', connection)
    }

    let id = connection.identifier

    if (!databases.has(id)) {
      let db = MySQLDatabase.create(connection)
      databases.set(id, db)
    }

    return databases.get(id)
  }
}

module.exports = MySQLDatabase
