import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import Example from '../../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  describe('when request is successful', async () => {
    afterEach(sinon.restore);
    it('must return status 200', async () => {
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
    })
  })
})