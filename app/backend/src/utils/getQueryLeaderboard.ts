import ITypePath from './interfaces/ITypePath';

const getQuery = (typePath: ITypePath): string => {
  const { p1goals, p1Id, tableP1Id, p2goals } = typePath;
  return `SELECT t.team_name AS name,
    SUM(((${p1goals} > ${p2goals})*3) + 
      ((${p1goals} = ${p2goals})*1)) AS totalPoints,
    COUNT(${p1Id}) AS totalGames,
    SUM((${p1goals} > ${p2goals})) AS totalVictories,
    SUM((${p1goals} = ${p2goals})) AS totalDraws,
    SUM((${p1goals} < ${p2goals})) AS totalLosses,
    SUM(${p1goals}) AS goalsFavor,
    SUM(${p2goals}) AS goalsOwn,
    SUM(${p1goals} - ${p2goals}) AS goalsBalance,
    round((SUM(((${p1goals} > ${p2goals})*3) + 
      ((${p1goals} = ${p2goals})*1)) / 
      (COUNT(${p1Id})*3) * 100), 2) AS efficiency
    FROM matches AS m JOIN teams AS t ON t.id = ${tableP1Id}
    WHERE m.in_progress = false GROUP BY ${tableP1Id}
    ORDER BY totalPoints DESC, totalVictories DESC, 
      goalsBalance DESC, goalsFavor DESC;`;
};

export default getQuery;
