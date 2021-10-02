import { graphql, useStaticQuery } from 'gatsby';
import { SiteMetadata } from '../components/types';

interface SiteProps {
  site: {
    siteMetadata: SiteMetadata;
  };
}

const useSiteMetadata = (): SiteMetadata => {
  const { site }: SiteProps = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
            twitterUrl
            youtubeUrl
          }
        }
      }
    `
  );

  return site.siteMetadata;
};

export default useSiteMetadata;
