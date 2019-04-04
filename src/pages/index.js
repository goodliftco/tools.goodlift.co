import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

// const IndexPage = () => (
//   <Layout>
//     <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
//     <h1>Hi people</h1>
//     <p>Welcome.</p>
//     <p>Nothing here just yet.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link>
//   </Layout>
// )


class IndexPage extends React.Component {
  render() {
    console.log(this);
    return (
      <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Hi people</h1>
        {this.props.data.allSitePage.edges.map(edge => (
          <p key={edge.node.path}>
            <Link to={edge.node.path}>{edge.node.path}</Link>
          </p>
        ))}
      </Layout>
    );
  }
};

export default IndexPage;

export const pageQuery = graphql`
  query allPages {
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`;