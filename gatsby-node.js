const path = require('path');

const createBlogPostPages = async ({ graphql, actions }) => {
  const { errors, data } = await graphql(`
    {
      allBlogPost {
        nodes {
          slug
          category
        }
      }
    }
  `);
  if (errors) {
    console.log(errors);
    throw new Error('There was an error');
  }

  const categories = new Set();
  const blogPostTemplate = path.resolve('./src/templates/Post.tsx');
  const blogPosts = data.allBlogPost.nodes;
  blogPosts.forEach((post, i) => {
    actions.createPage({
      path: `/${post.category}/${post.slug}/`,
      component: blogPostTemplate,
      context: {
        slug: post.slug,
      },
    });

    categories.add(post.category);
  });

  const blogCategoryTemplate = path.resolve('./src/templates/Category.tsx');
  Array.from(categories).forEach((category) => {
    actions.createPage({
      path: `/${category}/`,
      component: blogCategoryTemplate,
      context: {
        category,
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
        description: { type: 'String!' },
        category: { type: 'String!' },
        tags: { type: '[String!]!' },
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
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const collection = parent.sourceInstanceName;

    if (collection === 'blog') {
      const mdxBlogPost = {
        title: node.frontmatter.title,
        slug: node.frontmatter.slug,
        description: node.frontmatter.description,
        category: node.frontmatter.category,
        tags: node.frontmatter.tags,
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
