const teams = {
  Atlanta: {
    label: 'Atlanta Inferno',
    city: 'Atlanta',
    team: 'Inferno',
    abbreviation: 'ATL',
    league: 'SHL',
    conference: 'East',
  },
  Baltimore: {
    label: 'Baltimore Platoon',
    city: 'Baltimore',
    team: 'Platoon',
    abbreviation: 'BAL',
    league: 'SHL',
    conference: 'East',
  },
  Buffalo: {
    label: 'Buffalo Stampede',
    city: 'Buffalo',
    team: 'Stampede',
    abbreviation: 'BUF',
    league: 'SHL',
    conference: 'East',
  },
  Chicago: {
    label: 'Chicago Syndicate',
    city: 'Chicago',
    team: 'Syndicate',
    abbreviation: 'CHI',
    league: 'SHL',
    conference: 'East',
  },
  Hamilton: {
    label: 'Hamilton Steelhawks',
    city: 'Hamilton',
    team: 'Steelhawks',
    abbreviation: 'HAM',
    league: 'SHL',
    conference: 'East',
  },
  Manhattan: {
    label: 'Manhattan Rage',
    city: 'Manhattan',
    team: 'Rage',
    abbreviation: 'MAN',
    league: 'SHL',
    conference: 'East',
  },
  NewEngland: {
    label: 'New England Wolfpack',
    city: 'New England',
    team: 'Wolfpack',
    abbreviation: 'NEW',
    league: 'SHL',
    conference: 'East',
  },
  TampaBay: {
    label: 'Tampa Bay Barracudua',
    city: 'Tampa Bay',
    team: 'Barracudua',
    abbreviation: 'TBB',
    league: 'SHL',
    conference: 'East',
  },
  Toronto: {
    label: 'Toronto North Stars',
    city: 'Toronto',
    team: 'North Stars',
    abbreviation: 'TOR',
    league: 'SHL',
    conference: 'East',
  },
  Calgary: {
    label: 'Calgary Dragons',
    city: 'Calgary',
    team: 'Dragons',
    abbreviation: 'CAL',
    league: 'SHL',
    conference: 'West',
  },
  Edmonton: {
    label: 'Edmonton Blizzard',
    city: 'Edmonton',
    team: 'Blizzard',
    abbreviation: 'EDM',
    league: 'SHL',
    conference: 'West',
  },
  LosAngeles: {
    label: 'Los Angeles Panthers',
    city: 'Los Angeles',
    team: 'Panthers',
    abbreviation: 'LAP',
    league: 'SHL',
    conference: 'West',
  },
  Minnesota: {
    label: 'Minnesota Monarchs',
    city: 'Minnesota',
    team: 'Monarchs',
    abbreviation: 'MIN',
    league: 'SHL',
    conference: 'West',
  },
  NewOrleans: {
    label: 'New Orleans Specters',
    city: 'New Orleans',
    team: 'Specters',
    abbreviation: 'NOLA',
    league: 'SHL',
    conference: 'West',
  },
  SanFrancisco: {
    label: 'San Francisco Pride',
    city: 'San Francisco',
    team: 'Pride',
    abbreviation: 'SFP',
    league: 'SHL',
    conference: 'West',
  },
  Seattle: {
    label: 'Seattle Argonauts',
    city: 'Seattle',
    team: 'Argonauts',
    abbreviation: 'SEA',
    league: 'SHL',
    conference: 'West',
  },
  Texas: {
    label: 'Texas Renegades',
    city: 'Texas',
    team: 'Renegades',
    abbreviation: 'TEX',
    league: 'SHL',
    conference: 'West',
  },
  Winnipeg: {
    label: 'Winnipeg Aurora',
    city: 'Winnipeg',
    team: 'Aurora',
    abbreviation: 'WPG',
    league: 'SHL',
    conference: 'West',
  },
  Anaheim: {
    label: 'Anaheim Outlaws',
    city: 'Anaheim',
    team: 'Outlaws',
    abbreviation: 'ANA',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  Anchorage: {
    label: 'Anchorage Armada',
    city: 'Anchorage',
    team: 'Armada',
    abbreviation: 'ANC',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  Carolina: {
    label: 'Carolina Kraken',
    city: 'Carolina',
    team: 'Kraken',
    abbreviation: 'CAR',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  Colorado: {
    label: 'Colorado Raptors',
    city: 'Colorado',
    team: 'Raptors',
    abbreviation: 'COL',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  Detroit: {
    label: 'Detroit Falcons',
    city: 'Detroit',
    team: 'Falcons',
    abbreviation: 'DET',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  Kelowna: {
    label: 'Kelowna Knights',
    city: 'Kelowna',
    team: 'Knights',
    abbreviation: 'KEL',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  Maine: {
    label: 'Maine Timber',
    city: 'Maine',
    team: 'Timber',
    abbreviation: 'MET',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  Nevada: {
    label: 'Nevada Battleborn',
    city: 'Nevada',
    team: 'Battleborn',
    abbreviation: 'NBB',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  Newfoundland: {
    label: 'Newfoundland Berserkers',
    city: 'Newfoundland',
    team: 'Berserkers',
    abbreviation: 'NL',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  QuebecCity: {
    label: 'Quebec City Citadelles',
    city: 'Quebec City',
    team: 'Citadelles',
    abbreviation: 'QCC',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  StLouis: {
    label: 'St. Louis Scarecrows',
    city: 'St. Louis',
    team: 'Scarecrows',
    abbreviation: 'STL',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
  Vancouver: {
    label: 'Vancouver Whalers',
    city: 'Vancouver',
    team: 'Whalers',
    abbreviation: 'VAN',
    league: 'SMJHL',
    conference: 'SMJHL',
  },
}

export default teams