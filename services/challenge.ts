import { load } from "js-yaml"
import fsp from "node:fs/promises"
import parseDuration from "parse-duration"

type ApexMap = "olympus" | "worlds_edge" | "stormpoint"

interface BaseTeamMember {
  legend: string; // TODO Change with Apex legends type
}

interface SelenTeamMember extends BaseTeamMember {
  type: "selen";
}

interface RandomTeamMember extends BaseTeamMember {
  type: "random";
  name: string;
  kills: number;
}

interface NijiTeamMember extends BaseTeamMember {
  type: "niji";
  name: string;
  kills: number;
}

type TeamMember = SelenTeamMember | RandomTeamMember | NijiTeamMember;

interface ChallengeData {
  streams: Array<{
    url: string;
    guests: Array<{
      name: string;
    }>;
    games: Array<{
      url: string;
      map: ApexMap;
      team: Array<TeamMember>;
      summary: {
        kills: number;
        damage: number;
        revives: number;
        respawns: number;
        rank: number;
        time: string;
      };
    }>;
  }>;
}

export async function loadChallengeData(): Promise<ChallengeData> {
  const yaml = await fsp.readFile("./contents/challenge.yaml", { encoding: 'utf-8' });
  const challenge = load(yaml) as ChallengeData;

  return challenge;
}

export const FUNNY_NUMBER = 2434;

export function getStatistics(data: ChallengeData): {
  kills: number;
  wins: number;
  damage: number;
  revives: number;
  respawns: number;
  gamesPlayed: number;
  gameTime: number;
  score: number;
} {
  let kills = 0
  let nijiTeammateKills = 0
  let wins = 0
  let damage = 0
  let revives = 0
  let respawns = 0
  let gamesPlayed = 0
  let gameTime = 0

  for (const stream of data.streams) {
    gamesPlayed += stream.games.length

    for (const game of stream.games) {
      kills += game.summary.kills
      damage += game.summary.damage
      revives += game.summary.revives
      respawns += game.summary.respawns
      gameTime += parseDuration(game.summary.time, "second")

      for (const teamMember of game.team) {
        if (teamMember.type === "niji") {
          nijiTeammateKills += teamMember.kills
        }
      }

      if (game.summary.rank === 1) {
        wins += 1
      }
    }
  }

  const score = kills + nijiTeammateKills + 5 * wins

  return {
    kills,
    wins,
    damage,
    revives,
    respawns,
    gamesPlayed,
    gameTime,
    score
  }
}
