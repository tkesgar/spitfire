import dayjs from "dayjs";
import { GetStaticProps } from "next";
import NextImage from "next/future/image";
import apex2434Logo from "../assets/apex-2434-logo.png";
import { getStatistics, loadChallengeData } from "../services/challenge";

interface StaticProps {
  statistics: ReturnType<typeof getStatistics>;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const challengeData = await loadChallengeData();

  return {
    props: {
      statistics: getStatistics(challengeData),
    },
  };
};

export default function Index({ statistics }: StaticProps): React.ReactElement {
  const challengePercentage = Math.round((statistics.score / 2434) * 100);

  const killSpeed = statistics.gameTime / 60 / statistics.kills;

  const killPerGame = statistics.kills / statistics.gamesPlayed;

  return (
    <div className="container px-8 mx-auto">
      <div className="my-8 text-center">
        <NextImage
          src={apex2434Logo}
          className="w-[200px] h-[200px] mx-auto mb-8"
          priority
        />
        <h1 className="text-4xl font-light mb-8">
          Selen's Apex 2434 Nijisanji Tracker
        </h1>
        <div
          className="radial-progress bg-primary text-primary-content border-8 border-primary"
          style={{
            "--value": challengePercentage,
            "--size": "200px",
          }}
        >
          <div className="flex flex-col text-center">
            <div className="text-[3em] leading-none mb-2 font-bold">
              {challengePercentage}%
            </div>
            <div>
              <span className="text-[2em] leading-none font-light">
                {statistics.score}
              </span>
              /2434
            </div>
          </div>
        </div>
      </div>

      <div className="rounded p-8 bg-primary text-primary-content">
        <h2 className="text-2xl mb-4 text-center">Statistics</h2>
        <div className="flex">
          <ul className="mx-auto">
            <li>
              <b>Kills:</b> {statistics.kills}
            </li>
            <li>
              <b>Nijisanji teammate kills:</b> {statistics.nijiTeammateKills}
            </li>
            <li>
              <b>Wins:</b> {statistics.wins}
            </li>
            <li>
              <b>Revives:</b> {statistics.revives}
            </li>
            <li>
              <b>Respawns:</b> {statistics.respawns}
            </li>
            <li>
              <b>Games played:</b> {statistics.gamesPlayed}
            </li>
            <li>
              <b>Game time:</b>{" "}
              {dayjs
                .duration(statistics.gameTime, "second")
                .format("m[m] s[s]")}
            </li>
            <li>
              <b>Time per kill:</b> {killSpeed.toFixed(2)} minutes/kill
            </li>
            <li>
              <b>Average kill per game:</b> {killPerGame.toFixed(2)} kills/game
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary mt-8 pt-4 text-center">
        Created by{" "}
        <a className="link link-primary" href="https://twitter.com/tkesgar">
          Ted Kesgar
        </a>{" "}
        | View on{" "}
        <a
          className="link link-primary"
          href="https://github.com/tkesgar/spitfire"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
