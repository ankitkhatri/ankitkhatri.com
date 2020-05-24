const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    throw result.errors;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.path !== '/demo') {
      createPage({
        path: node.frontmatter.path,
        component: blogPost,
        context: {}, // additional data can be passed via context
      })
    }
  })
}
