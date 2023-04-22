import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import Example from '../../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Match from '../../database/models/Match'
chai.use(chaiHttp);

const { expect } = chai;
describe('tests routes for MATCHES', () => {

  describe('GET /matches', () => {
    afterEach(sinon.restore);
    describe('when request is successful', async () => {
      
      it('should return status 200 and all matches in db', async () => {
        const matches = [
          {
            "id": 1,
            "homeTeamId": 16,
            "homeTeamGoals": 1,
            "awayTeamId": 8,
            "awayTeamGoals": 1,
            "inProgress": false,
            "homeTeam": {
              "teamName": "São Paulo"
            },
            "awayTeam": {
              "teamName": "Grêmio"
            }
          },
          {
            "id": 41,
            "homeTeamId": 16,
            "homeTeamGoals": 2,
            "awayTeamId": 9,
            "awayTeamGoals": 0,
            "inProgress": true,
            "homeTeam": {
              "teamName": "São Paulo"
            },
            "awayTeam": {
              "teamName": "Internacional"
            }
          }
        ]
  // sinon.stub(Model, 'findAll').resolves(matches as Match[]);
  const httpResponse = await chai.request(app).get('/matches');
  expect (httpResponse.status).to.be.equal(200);
  expect (httpResponse.body).to.deep.equal(matches);
      })
    })
  })

  describe('GET /match/id', () => {
    describe('when request is successful', () => {
      it('should return status 200 and one team with the searched id', async () => {
        const match =  {
          "id": 41,
          "homeTeamId": 16,
          "homeTeamGoals": 2,
          "awayTeamId": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Internacional"
          }
        }
        // sinon.stub(Model, 'findByPk').resolves(match as Match)
        const httpResponse = await chai.request(app).get('/macthes/:41');
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal(match)
      })
    })
  })

  describe('GET /matches?inProgress=false', () => {
    describe('when request is successful', () => {
      it('should return status 200 and all the completed matches', async () => {
        const httpResponse = await chai.request(app).get('/matches?inProgress=false')

        expect (httpResponse.status).to.be.equal(200)
        expect (httpResponse.body).to.be.deep.equal([ {
          "id": 1,
          "homeTeamId": 16,
          "homeTeamGoals": 1,
          "awayTeamId": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Grêmio"
          }
        }])
      })
      it('should return status 200 and all the matches in progress', async () => {
        const httpResponse = await chai.request(app).get('/matches?inProgress=true')

        expect (httpResponse.status).to.be.equal(200)
        expect (httpResponse.body).to.be.deep.equal([ {
          "id": 41,
          "homeTeamId": 16,
          "homeTeamGoals": 2,
          "awayTeamId": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeTeam": {
            "teamName": "São Paulo"
          },
          "awayTeam": {
            "teamName": "Internacional"
          }
        }])
      })
      
    })
  })
})
