const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

const createBlogPostPages = async ({ graphql, actions }) => {
  // fetch blog posts with a published date (not a draft)
  const { errors, data } = await graphql(`
    {
      allBlogPost(filter: { publishedDate: { ne: null } }) {
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
  });
};

const createCategoryPages = async ({ graphql, actions }) => {
  const { errors, data } = await graphql(`
    {
      allCategory {
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
  const categories = data.allCategory.nodes;
  const blogCategoryTemplate = path.resolve('./src/templates/Category.tsx');
  Array.from(categories).forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}/`,
      component: blogCategoryTemplate,
      context: {
        slug,
      },
    });
  });
};

const createPages = async ({ graphql, actions }) => {
  await createBlogPostPages({ graphql, actions });
  await createCategoryPages({ graphql, actions });
};

exports.createPages = createPages;
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
        publishedDate: {
          type: 'Date',
          extensions: {
            dateformat: {},
          },
        },
        updatedDate: {
          type: 'Date',
          extensions: {
            dateformat: {},
          },
        },
        timeToRead: {
          type: 'Int!',
          resolve: (source, args, context, info) => {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['timeToRead'].resolve;
            return resolver(mdxNode, {}, context, {
              fieldName: 'timeToRead',
            });
          },
        },
        // wordCount: {
        //   type: 'MdxWordCount!',
        //   //type: 'Int!',
        //   resolve: (source, args, context, info) => {
        //     const type = info.schema.getType(`Mdx`);
        //     console.log('source.parent', source.parent);
        //     const mdxNode = context.nodeModel.getNodeById({
        //       id: source.parent,
        //     });
        //     console.log('mdxNode', mdxNode);
        //     const resolver = type.getFields()['wordCount'].resolve;
        //     return resolver(mdxNode, {}, context, {
        //       fieldName: 'wordCount',
        //     });
        //   },
        // },
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
      name: `Category`,
      fields: {
        id: { type: `ID!` },
        name: { type: 'String!' },
        slug: { type: 'String!' },
        logoUrl: { type: 'String' },
        logoImage: { type: 'File' },
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

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  createNodeId,
  cache,
  store,
  reporter,
}) => {
  const { createNode, createParentChildLink } = actions;
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const collection = parent.sourceInstanceName;

    try {
      if (collection === 'blog') {
        const mdxBlogPost = {
          title: node.frontmatter.title,
          slug: node.frontmatter.slug,
          description: node.frontmatter.description,
          category: node.frontmatter.category,
          tags: node.frontmatter.tags,
          authors: node.frontmatter.authors,
          publishedDate: node.frontmatter.publishedDate,
          updatedDate: node.frontmatter.updatedDate,
          // timeToRead: node.timeToRead,
          // wordCount: node.wordCount.words,
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

        createParentChildLink({
          parent: parent,
          child: node,
        });
      } else if (collection === 'categories') {
        const mdxCategory = {
          name: node.frontmatter.name,
          slug: node.frontmatter.slug,
          logoUrl: node.frontmatter.logoUrl,
          logoImage:
            node.frontmatter.logoUrl &&
            (await createRemoteFileNode({
              url: node.frontmatter.logoUrl,
              parentNodeId: node.id,
              createNode,
              createNodeId,
              cache,
              store,
              reporter,
            })),
          body: node.rawBody,
        };

        createNode({
          id: createNodeId(`${node.id} >>> Category`),
          ...mdxCategory,
          parent: node.id,
          //children: [],
          internal: {
            type: 'Category',
            contentDigest: node.internal.contentDigest,
          },
        });
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
    } catch (err) {
      console.log(err);
    }
  }
};
