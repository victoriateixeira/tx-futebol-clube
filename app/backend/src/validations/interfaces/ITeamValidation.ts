export default interface ITeamValidation {
  validateTeams(homeTeamId: number, awayTeamId: number): Promise<void>
}
