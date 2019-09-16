const db = require('../database/dbConfig.js')

module.exports = {
    add,
    find,
    findBy
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

function find() {
    return db('users').select('id', 'username')
}

function findBy(info) {
    return db('users').where(info)
}

function findById(id) {
    return db('users')
        .where({ id })
        .first()
}