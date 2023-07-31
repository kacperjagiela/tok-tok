import { useParams } from "react-router-dom";

import { Layout } from "../../components/Layout/Layout";

export const SingleProfile = () => {
  const { username } = useParams();

  return (
    <Layout>
      <div>SingleProfile</div>
      <div>{username}</div>
    </Layout>
  );
};
