class Team {
  constructor (team) {
    for (var prop in team) this[prop] = team[prop];
  }
}

export default Team;
