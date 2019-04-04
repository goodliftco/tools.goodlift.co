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
                {tool.data.Attachments &&
                  tool.data.Attachments.localFiles !== 0 ? (
                    <div className="card-image">
                      <figure className="image">
                        <Img
                          alt="Tool"
                          fluid={
                            tool.data.Attachments.localFiles[0].childImageSharp
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
                  <div className="level">
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Rating</p>
                        <p className="">
                          {checkBlank(tool.data.Rating)}
                          {`\u2606`}
                          /10
                        </p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Last Made</p>
                        <p className="">{checkBlank(tool.data.Last_Made)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Prep Time</p>
                        <p className="">{`Prep: ${checkBlankTime(
                          tool.data.Preparation_Time
                        )}`}</p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Cook Time</p>
                        <p className="">{`Cooking: ${checkBlankTime(
                          tool.data.Cooking_Time
                        )}`}</p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Total Time</p>
                        <p className="">{`Total: ${checkBlankTime(
                          tool.data.Total_Time
                        )}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="content">
                    <h2 className="title">Ingredients</h2>
                    <div>
                      <ul>
                        {tool.data.Ingredients.split(`\n`).map(
                          (ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <h2 className="title">Directions</h2>
                    {tool.data.Directions.split(`\n`).map(
                      (direction, index) => (
                        <p key={index}>{direction}</p>
                      )
                    )}
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

let checkBlank = value => (value ? value : `--`);
let checkBlankTime = value => (value ? `${value}m` : `--`);