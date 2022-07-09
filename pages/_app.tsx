import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import "../styles/main.css";

dayjs.extend(duration);

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
