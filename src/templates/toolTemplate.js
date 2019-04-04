import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout.js";

class SimpleTool extends React.Component {
  render() {
    let tool = this.props.data.airtable;

    return (
      <Layout>
        <div className="section">
          <div className="columns is-centered">
            <div className="column is-half">
              <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/Tools/">Tools</Link>
                  </li>
                  <li className="is-active">{tool.data.Name}</li>
                </ul>
              </nav>
              <div className="card">
                {tool.data.Images &&
                  tool.data.Images.localFiles !== 0 ? (
                    <div className="card-image">
                      <figure className="image">
                        <Img
                          alt="Tool"
                          fluid={
                            tool.data.Images.localFiles[0].childImageSharp
                              .fluid
                          }
                        />
                      </figure>
                    </div>
                  ) : (
                    <div className="card-image">
                      <figure className="image is-3by2">
                        <img
                          alt="Tool"
                          src={this.props.data.placeholder.publicURL}
                        />
                      </figure>
                    </div>
                  )}
                <div className="card-content">
                  <h2 className="title has-text-centered">
                    {tool.data.Name}
                  </h2>
                  <div className="content">
                      {tool.data.Description}
                  </div>
                </div>
                {tool.data.URL ? (
                  <footer className="card-footer">
                    <a
                      href={tool.data.URL}
                      className="card-footer-item"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tool Link
                    </a>
                  </footer>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default SimpleTool;

export const pageQuery = graphql`
  query SimpleToolBySlug($name: String!) {
    airtable(table: { eq: "Tools" }, data: { Name: { eq: $name } }) {
      id
      data {
        Name
        Description
        URL
      }
    }
    placeholder: file(relativePath: { eq: "placeholder.png" }) {
      publicURL
    }
  }
`;

// export const pageQuery = graphql`
//   query SimpleToolBySlug($name: String!) {
//     airtable(table: { eq: "Tools" }, data: { Name: { eq: $name } }) {
//       id
//       data {
//         Name
//         Description
//         URL
//         Images {
//           localFiles {
//             childImageSharp {
//               fluid(maxWidth: 256) {
//                 ...GatsbyImageSharpFluid_tracedSVG
//               }
//             }
//           }
//         }
//       }
//     }
//     placeholder: file(relativePath: { eq: "placeholder.png" }) {
//       publicURL
//     }
//   }
// `;

// let checkBlank = value => (value ? value : `--`);
// let checkBlankTime = value => (value ? `${value}m` : `--`);