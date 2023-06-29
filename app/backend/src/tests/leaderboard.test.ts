// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
// import { Model } from 'sequelize';
// import Team from '../database/models/Team'
// import Match from '../database/models/Match';
// import LeaderboardRepository from '../repositories/LeaderboardSequelizeRepository';
// chai.use(chaiHttp);

// const { expect } = chai;
// describe('tests routes for LEADERBOARD', () => {

//   describe('GET /leaderboard/home', () => {
//     afterEach(sinon.restore);
//     describe('when request is successful', async () => {
      
//       it('should return status 200 and hometeams leaderboard', async () => {
//         const homeTeamIds =
//           [
//             {homeTeamId: 1
//             },
//             {homeTeamId: 2
//             },
//             {homeTeamId: 3
//             },
//         ];

//         const homeScoreBoard = [
//             {
//     name: 'Botafogo',
//     totalPoints: 4,
//     totalGames: 3,
//     totalVictories: 1,
//     totalLosses: 1,
//     totalDraws: 1,
//     goalsFavor: 2,
//     goalsOwn: 4,
//     goalsBalance: -2,
//     efficiency: '44.44'
//   },
//    { name: 'Avaí/Kindermann',
//     totalPoints: 1,
//     totalGames: 3,
//     totalVictories: 0,
//     totalLosses: 2,
//     totalDraws: 1,
//     goalsFavor: 3,
//     goalsOwn: 7,
//     goalsBalance: -4,
//     efficiency: '11.11'
//   },
//   {
//     name: 'Bahia',
//     totalPoints: 0,
//     totalGames: 3,
//     totalVictories: 0,
//     totalLosses: 3,
//     totalDraws: 0,
//     goalsFavor: 0,
//     goalsOwn: 4,
//     goalsBalance: -4,
//     efficiency: '0.00'
//   },

//         ]
//   sinon.stub(LeaderboardRepository.prototype, 'getHomeTeams').resolves(homeTeamIds);
//   const httpResponse = await chai.request(app).get('/leaderboard/home');
//   expect (httpResponse.status).to.be.equal(200);
//   expect (httpResponse.body).to.deep.equal(homeScoreBoard);
//       })
//     })
//   })

//   describe('GET /teams/id', () => {
//     describe('when request is successful', () => {
//       it('should return status 200 and one team with the searched id', async () => {
//         const team =  {
//           "id": 2,
//           "teamName": "Bahia"
//         }
//         sinon.stub(Model, 'findByPk').resolves(team as Team)
//         const httpResponse = await chai.request(app).get('/teams/:2');
//         expect(httpResponse.status).to.equal(200);
//         expect(httpResponse.body).to.be.deep.equal(team)
//       })
//     })
//   })
// })
