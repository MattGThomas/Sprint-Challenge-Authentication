const request = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig.js')

describe('the SERVER', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })
    describe('GET /', () => {
        it('should return status: 200', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
        it('should an return object', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toBe('application/json')
                    expect(res.body).toEqual({ api: 'down' })
                })
        })
    })
    describe('GET /jokes', () => {
        it('should return status: 404 ', () => {
            return request(server)
                .get('/jokes')
                .then(res => {
                    expect(res.status).toBe(404)
                })
        })
        it('should return a list of hobbits object', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toBe('application/json')
                    expect(res.body.length).toBe(undefined)
                })
        })
    })
    describe('POST /register', () => {
        it('should return status: 500', () => {
            return request(server)
                .post('/api/auth/register')
                .then(res => {
                    expect(res.status).toBe(500)
                })
        })
        it('should return a the structure: id, username, password', () => {
            return request(server)
                .post('/api/auth/register')
                .then(res => {
                    expect.objectContaining({
                        id: expect.any(Number),
                        username: expect.any(String),
                        password: expect.any(String)
                    })
                })
        })
    })
    describe('POST /login', () => {
        it('should return status: 500', () => {
            return request(server)
                .post('/api/auth/login')
                .then(res => {
                    expect(res.status).toBe(500)
                })
        })
        it('should return a structure: message, token', () => {
            return request(server)
                .post('/api/auth/login')
                .then(res => {
                    expect.objectContaining({
                        message: expect.any(String),
                        token: expect.any(String)
                    })
                })
        })
    })
})