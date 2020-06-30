import React from "react"

import Layout from "../components/layout"
import PostLink from "../components/post-link"
import SEO from "../components/seo"

const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
  location
}) => {
  const siteTitle = "Ankit Khatri's personal blog."
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout location={location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`Ankit Khatri`, `CodeMyMobile`]}
        />
      <h2>{site.siteMetadata.title}</h2>
      <div className="grids">
        {Posts}
      </div>
    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`

