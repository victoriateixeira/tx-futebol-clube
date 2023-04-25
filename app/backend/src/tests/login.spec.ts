import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import Example from '../../database/models/ExampleModel';
import LoginService from '../services/LoginService'
// import { Response } from 'superagent';
import { Model } from 'sequelize';
import User from '../database/models/User'
import TokenService from '../utils/TokenService';
chai.use(chaiHttp);

const { expect } = chai;

describe('tests routes for LOGIN', () => {

  describe('POST /login', () => {
    afterEach(sinon.restore);
    describe('when login email and/or password are not provided', async () => {
      it('should return status 400 when email is not provided', async () => {
        const body =
          {
            password: "123456"
          }
  const httpResponse = await chai.request(app).post('/login').send(body)
  
  expect (httpResponse.status).to.be.equal(400);
  expect (httpResponse.body).to.deep.equal({ message: "All fields must be filled" });
      })
      it('should return status 400 when password is not provided', async () => {
        const body =
          {
            email: 'validEmail@email.com',
          }
  const httpResponse = await chai.request(app).post('/login').send(body)
  expect (httpResponse.status).to.be.equal(400);
  expect (httpResponse.body).to.deep.equal({ message: "All fields must be filled" });
      })
      it('should return status 401 when email is not found', async () => {
        const body =
          {
            email: 'not_found_email@email.com',
            password: '123456'

          }
        sinon.stub(Model, "findOne").resolves(null)
        const httpResponse = await chai.request(app).post('/login').send(body)
        expect (httpResponse.status).to.be.equal(401);
        expect (httpResponse.body).to.deep.equal({ message: "Invalid email or password" });
      })
      it('should return status 401 when password is not valid', async () => {
        const user = {
        id: 1,
        username: 'TFC',
        role: 'Coach',
        email: 'valid_email@mail.com',
        password: '123456',
        }
        const body =
          {
            email: 'valid_email@email.com',
            password: 'invalid_password'
          }
         sinon.stub(Model, 'findOne').resolves(user as User)
         sinon.stub(LoginService, 'verifyUserPassword').resolves(false)
         const httpResponse = await chai.request(app).post('/login').send(body)
         expect (httpResponse.status).to.be.equal(401);
         expect (httpResponse.body).to.deep.equal({ message: "Invalid email or password" });
      })
    })

  })
  describe('when request is successful', () => {
      it('should return status 200 and a token', async () => {
        const user = {
          id: 1,
          username: 'TFC',
          role: 'Coach',
          email: 'valid_email@mail.com',
          password: '123456',
          }
          const body =
            {
              email: 'valid_email@email.com',
              password: '123456'
            }
    sinon.stub(Model, 'findOne').resolves(user as User)
    sinon.stub(LoginService, 'verifyUserPassword').resolves(true)
    const httpResponse = await chai.request(app).post('/login').send(body)
    expect (httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.have.key('token')
    expect (httpResponse.body.token).to.be.a('string');
      })
    })
  
    describe('GET login/role', () => {
      describe('if request is unsuccessful', () => {
        it('should return status 401 and error message if token is not provided', async() => {
          const httpResponse = await chai.request(app).get('/login/role')
          expect(httpResponse.status).to.be.equal(401)
          expect(httpResponse.body).to.be.equal({
            message: "Token not found"
          })
        })
        it('should return status 401 and error message if token is not valid', async() => {
          const httpResponse = await  chai.request(app).get('/login/role').set('Authorization', 'invalidToken')
          expect(httpResponse.status).to.be.equal(401)
          expect(httpResponse.body).to.be.equal({
            message: "Token must be a valid token"
          })
        })
      describe('if request is successful',  () => {
        it('should return status 200 and user role ', async () => {
          const userRole = { "role": "admin" }
          const body =
          {
            email: 'valid_email@email.com',
            password: '123456'
          }
          sinon.stub(TokenService.prototype, 'sign').returns('token')
          const httpResponse = await chai.request(app).post('/login')
          // const token = httpResponse.body.token
          const httpResponseRole = await chai.request(app).get('login/role').set('Authorization', 'token')
          expect(httpResponseRole.status).to.be.equal(200)
          expect(httpResponseRole.body).to.be.deep.equal(userRole)
        })
      })
    })
  })
})
