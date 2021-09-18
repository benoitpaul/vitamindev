const path = require('path');

const createBlogPostPages = async ({ graphql, actions }) => {
  const blogPostTemplate = path.resolve('./src/templates/post.tsx');
  const { errors, data } = await graphql(`
    {
      allBlogPost {
        nodes {
          slug
        }
      }
    }
  `);
  if (errors) {
    console.log(errors);
    throw new Error('There was an error');
  }

  console.log('data:', data);
  const blogPosts = data.allBlogPost.nodes;
  console.log('blogPosts:', blogPosts);
  blogPosts.forEach((post, i) => {
    console.log('creating page for: post.slug');
    actions.createPage({
      path: post.slug,
      component: blogPostTemplate,
      context: {
        slug: post.slug,
      },
    });
  });
};

exports.createPages = createBlogPostPages;
// TODO: sourceNodes vs createSchemaCustomization
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  createTypes([
    schema.buildObjectType({
      name: `BlogPost`,
      fields: {
        id: { type: `ID!` },
        title: { type: 'String!' },
        slug: { type: 'String!' },
        authors: {
          type: '[Person!]!',
          resolve: (source, args, context, info) => {
            return context.nodeModel
              .getAllNodes({ type: 'Person' })
              .filter((person) => source.authors.includes(person.email));
          },
        },
        body: {
          type: 'String!',
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['body'].resolve;
            return resolver(mdxNode, {}, context, {
              fieldName: 'body',
            });
          },
        },
      },
      interfaces: [`Node`],
    }),

    schema.buildObjectType({
      name: `Person`,
      fields: {
        id: { type: `ID!` },
        name: { type: 'String!' },
        email: { type: 'String!' },
        slug: { type: 'String!' },
        photoUrl: { type: 'String' },
        socialUrls: { type: '[String]' },
        bio: {
          type: 'String!',
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['body'].resolve;
            return resolver(mdxNode, {}, context, {
              fieldName: 'body',
            });
          },
        },
      },
      interfaces: [`Node`],
    }),
  ]);
};

exports.onCreateNode = ({ node, getNode, actions, createNodeId }) => {
  const { createNode, createParentChildLink } = actions;
  console.log('node.internal.type: ', node.internal.type);
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const collection = parent.sourceInstanceName;

    if (collection === 'blog') {
      const mdxBlogPost = {
        title: node.frontmatter.title,
        slug: node.frontmatter.slug,
        authors: node.frontmatter.authors,
        body: node.rawBody,
      };

      createNode({
        id: createNodeId(`${node.id} >>> BlogPost`),
        ...mdxBlogPost,
        parent: node.id,
        //children: [],
        internal: {
          type: 'BlogPost',
          contentDigest: node.internal.contentDigest,
        },
      });

      //   createParentChildLink({
      //     parent: parent,
      //     child: node,
      //   });
    } else if (collection === 'persons') {
      const mdxPerson = {
        name: node.frontmatter.name,
        email: node.frontmatter.email,
        slug: node.frontmatter.slug,
        photoUrl: node.frontmatter.photoUrl,
        socialUrls: node.frontmatter.socialUrls,
        bio: node.rawBody,
      };

      createNode({
        id: createNodeId(`${node.id} >>> Person`),
        ...mdxPerson,
        parent: node.id,
        //children: [],
        internal: {
          type: 'Person',
          contentDigest: node.internal.contentDigest,
        },
      });

      //   createParentChildLink({
      //     parent: parent,
      //     child: node,
      //   });
    }
  }
};
