const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

const createBlogPostPages = async ({ graphql, actions }) => {
  // fetch blog posts with a published date (not a draft)
  const { errors, data } = await graphql(`
    {
      allBlogPost(filter: { publishedDate: { ne: null } }) {
        nodes {
          slug
          categorySlug
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
  blogPosts.forEach((post) => {
    actions.createPage({
      path: `/${post.categorySlug}/${post.slug}/`,
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

const createAuthorsPages = async ({ graphql, actions }) => {
  const { errors, data } = await graphql(`
    {
      allPerson {
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

  const authorTemplate = path.resolve('./src/templates/Author.tsx');
  const persons = data.allPerson.nodes;
  persons.forEach((person, i) => {
    actions.createPage({
      path: `/author/${person.slug}/`,
      component: authorTemplate,
      context: {
        slug: person.slug,
      },
    });
  });
};

const createPages = async ({ graphql, actions }) => {
  await createBlogPostPages({ graphql, actions });
  await createCategoryPages({ graphql, actions });
  await createAuthorsPages({ graphql, actions });
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
        canonicalUrl: {
          type: 'String!',
          resolve: (source, args, context, info) => {
            const { siteUrl } = context.nodeModel.getAllNodes({
              type: 'Site',
            })[0].siteMetadata;
            return `${siteUrl}/${source.categorySlug}/${source.slug}/`;
          },
        },
        title: { type: 'String!' },
        slug: { type: 'String!' },
        description: { type: 'String!' },
        categorySlug: { type: 'String!' },
        categoryName: {
          type: 'String!',
          resolve: (source, args, context, info) => {
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            return context.nodeModel
              .getAllNodes({
                type: 'Category',
              })
              .find(
                (category) => mdxNode.frontmatter.category === category.slug
              ).name;
          },
        },
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
        wordCount: {
          type: 'Int!',
          resolve: async (source, args, context, info) => {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['wordCount'].resolve;
            const wordCount = await resolver(mdxNode, {}, context, {
              fieldName: 'wordCount',
            });
            return wordCount.words;
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
        internalContent: {
          type: 'String!',
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            return mdxNode.internal.content;
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
        canonicalUrl: {
          type: 'String!',
          resolve: (source, args, context, info) => {
            const { siteUrl } = context.nodeModel.getAllNodes({
              type: 'Site',
            })[0].siteMetadata;
            return `${siteUrl}/${source.slug}/`;
          },
        },
        description: {
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
        descriptionExcerpt: {
          type: 'String!',
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['excerpt'].resolve;
            return resolver(
              mdxNode,
              {
                pruneLength: 1000,
              },
              context,
              {
                fieldName: 'excerpt',
              }
            );
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
        canonicalUrl: {
          type: 'String!',
          resolve: (source, args, context, info) => {
            const { siteUrl } = context.nodeModel.getAllNodes({
              type: 'Site',
            })[0].siteMetadata;
            return `${siteUrl}/author/${source.slug}/`;
          },
        },
        homepageUrl: { type: 'String' },
        twitterUrl: { type: 'String' },
        linkedInUrl: { type: 'String' },
        facebookUrl: { type: 'String' },
        description: {
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
        descriptionExcerpt: {
          type: 'String!',
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            });
            const resolver = type.getFields()['excerpt'].resolve;
            return resolver(
              mdxNode,
              {
                pruneLength: 1000,
              },
              context,
              {
                fieldName: 'excerpt',
              }
            );
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
          categorySlug: node.frontmatter.category,
          tags: node.frontmatter.tags,
          authors: node.frontmatter.authors,
          publishedDate: node.frontmatter.publishedDate,
          updatedDate: node.frontmatter.updatedDate,
          body: node.rawBody,
        };

        createNode({
          id: createNodeId(`${node.id} >>> BlogPost`),
          ...mdxBlogPost,
          parent: node.id,
          //children: [],
          internal: {
            type: 'BlogPost',
            content: node.internal.content,
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

        createParentChildLink({
          parent: parent,
          child: node,
        });
      } else if (collection === 'persons') {
        const mdxPerson = {
          name: node.frontmatter.name,
          email: node.frontmatter.email,
          slug: node.frontmatter.slug,
          photoUrl: node.frontmatter.photoUrl,
          homepageUrl: node.frontmatter.homepageUrl,
          twitterUrl: node.frontmatter.twitterUrl,
          linkedInUrl: node.frontmatter.linkedInUrl,
          facebookUrl: node.frontmatter.facebookUrl,
          description: node.rawBody,
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

        createParentChildLink({
          parent: parent,
          child: node,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
