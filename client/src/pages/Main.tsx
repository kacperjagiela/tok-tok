import { Feed, FeedType } from "../components/Feed";
import { Layout } from "../components/Layout/Layout";

interface Props {
  feedType?: FeedType;
}

export const Main = ({ feedType }: Props) => {
  return (
    <Layout>
      <Feed feedType={feedType ?? FeedType.Home} />
    </Layout>
  );
};
