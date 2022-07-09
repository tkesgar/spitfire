import { GetStaticProps } from "next"
import { getStatistics, loadChallengeData } from "../services/challenge"

interface StaticProps {
  statistics: ReturnType<typeof getStatistics>;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const challengeData = await loadChallengeData()

  return {
    props: {
      statistics: getStatistics(challengeData)
    }
  }
}

export default function Index({ statistics }: StaticProps): React.ReactElement {
  return <div>
    <h1>Hello world!</h1>
    <p>It works!</p>
    <pre>{ JSON.stringify(statistics, null, 2) }</pre>
  </div>
}
