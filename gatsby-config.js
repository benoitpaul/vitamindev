module.exports = {
  siteMetadata: {
    title: `VitaminDev`,
    description: `Learn React, Angular 2+, Javascript and CSS with bite sized, no fluff posts.`,
    author: `@benoitpaul`,
    siteUrl: `https://vitamindev.com/`,
    twitterUrl: `https://twitter.com/vitamindevblog`,
    youtubeUrl: `https://www.youtube.com/channel/UCUvU9SoGYrUwNZyifWkQHNg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `categories`,
        path: `${__dirname}/content/categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `persons`,
        path: `${__dirname}/content/persons`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `vitamin-dev`,
        short_name: `vitamin-dev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/emoji-sun.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icons/,
        },
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1100,
              quality: 50,
              withWebp: true,
              withAvif: true,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg viewBox="0 0 448 512" stroke="currentColor" fill="currentColor" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"></path></svg>`,
              className: `hash-anchor`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            // options: {
            //   theme: 'Abyss',
            // },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-gravatar`,
      options: {
        // Required.
        // A list of emails to create URLs for.
        emails: [],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { allBlogPost } }) => {
              return allBlogPost.nodes.map((node) => {
                return Object.assign({}, node, {
                  date: node.publishedDate,
                  url: node.canonicalUrl,
                  guid: node.canonicalUrl,
                  author: node.authors[0].name,
                });
              });
            },
            query: `
              {
                allBlogPost(
                  sort: {fields: publishedDate, order: DESC}
                  filter: {publishedDate: {ne: null}}
                ) {
                  nodes {
                    canonicalUrl
                    description
                    publishedDate
                    title
                    authors {
                      name
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'VitaminDev | RSS Feed',
          },
        ],
        custom_elements: [
          {
            'atom:link href="https://vitamindev.com/rss.xml" rel="self" type="application/rss+xml"':
              null,
          },
        ],
      },
    },
    // SEO
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-PJWHQP4',
        includeInDevelopment: false,
        enableWebVitalsTracking: true,
      },
    },
  ],
};
