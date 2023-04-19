import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import Example from '../../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import User from '../../database/models/Team'
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
  expect (httpResponse.body).to.deep.equal({error: 'o campo email é obrigatório'});
      })
      it('should return status 400 when password is not provided', async () => {
        const body =
          {
            email: 'validEmail@email.com',
          }
  const httpResponse = await chai.request(app).post('/login').send(body)
  expect (httpResponse.status).to.be.equal(400);
  expect (httpResponse.body).to.deep.equal({error: 'o campo senha é obrigatório'});
      })
      it('should return status 401 when email is not found', async () => {
        const body =
          {
            email: 'not_found_email@email.com',
            password: '123456'

          }
  const httpResponse = await chai.request(app).post('/login').send(body)
  expect (httpResponse.status).to.be.equal(401);
  expect (httpResponse.body).to.deep.equal({error: 'email e/ou senha inválidos'});
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
  sinon.stub(UserService.prototype, 'verifyUserPassword').returns(false)
  const httpResponse = await chai.request(app).post('/login').send(body)
  expect (httpResponse.status).to.be.equal(401);
  expect (httpResponse.body).to.deep.equal({error: 'email e/ou senha inválidos'});
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
    sinon.stub(UserService.prototype, 'verifyUserPassword').returns(true)
    const httpResponse = await chai.request(app).post('/login').send(body)
    expect (httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.have.key('token')
    expect (httpResponse.body.token).to.be.a('string');
      })
    })
  
})