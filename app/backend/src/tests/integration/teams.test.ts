import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import Example from '../../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Team from '../../database/models/Team'
chai.use(chaiHttp);

const { expect } = chai;
describe('tests routes for TEAMS', () => {

  describe('GET /teams', () => {
    describe('when request is successful', async () => {
      afterEach(sinon.restore);
      it('should return status 200 and all teams in db', async () => {
        const teams = [
          {
            "id": 1,
            "teamName": "Avaí/Kindermann"
          },
          {
            "id": 2,
            "teamName": "Bahia"
          },
          {
            "id": 3,
            "teamName": "Botafogo"
          },
        ];
  sinon.stub(Model, 'findAll').resolves(teams as Team[]);
  const httpResponse = await chai.request(app).get('/teams');
  expect (httpResponse.status).to.be.equal(200);
  expect (httpResponse.body).to.deep.equal(teams);
      })
    })
  })

  describe('GET /teams/id', () => {
    describe('when request is successful', () => {
      it('should return status 200 and one team with the searched id', async () => {
        const team =  {
          "id": 2,
          "teamName": "Bahia"
        }
        sinon.stub(Model, 'findByPk').resolves(team as Team)
        const httpResponse = await chai.request(app).get('/teams/:2');
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal(team)
      })
    })
  })
})
