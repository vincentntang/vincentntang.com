import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import GitHubButton from 'react-github-btn';
import Layout from '../layout';
import PostListing from '../components/PostListing';
import ProjectListing from '../components/ProjectListing';
import SimpleListing from '../components/SimpleListing';
import NewsletterForm from '../components/NewsletterForm';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import projects from '../../data/projects';
import speaking from '../../data/speakingData';
import podcasts from '../../data/podcasts';
// import vtYellow from '../../content/common/VT_yellowBG.png';
import codeChefsLogo from "../images/code_chefs_podcast_art.png"
// import vincentBlue from '../../../content/common/vincent_blue.jpg';
import UserInfo from "../components/UserInfo";

export default class Index extends Component {
  render() {
    const { data } = this.props;

    const latestPostEdges = data.latest.edges;
    const popularPostEdges = data.popular.edges;
    const vincentBlueImg = data.vincentBlue.edges[0];

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Web developer & writer`} />
        <SEO />
        <div className="container">
          {/* <div className="lead">
            <a
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={vtYellow}
                className="new-moon-icon"
                title="Hmm? What's this?"
                alt="Hmm? What's this?"
              />
            </a>
            <h1>{`Hi, I'm Vincent`}</h1>
            <p>
              {`I'm a web developer specializing in modern JavaScript who loves to learn new things. Welcome to my digital garden of topics in backend, frontend, devops, and more 🌱 `}
            </p>
            <div className="social-buttons">
              <div>
                <a
                  className="twitter-follow-button"
                  href="https://twitter.com/vincentntang"
                  data-size="large"
                  data-show-screen-name="false"
                >
                  Follow @vincentntang
                </a>
              </div>
              <div>
                <GitHubButton
                  href="https://github.com/vincentntang"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Follow @vincentntang on GitHub"
                >
                  Follow
                </GitHubButton>
              </div>
            </div>
          </div> */}
        </div>
        <UserInfo isHomePage gatsbyImg={vincentBlueImg}/>
        <div className="container front-page">
          <section className="section">
            <h2>Latest Articles</h2>
            <PostListing simple postEdges={latestPostEdges} />
          </section>

          <section className="section">
            <h2>Most Popular</h2>
            <PostListing simple postEdges={popularPostEdges} />
          </section>

          <section className="section">
            <div className="podcast-wrapper">
              <div className="content-left">
                <h2>CodeChefs.dev</h2>
                <p>I run a podcast for junior to mid-level web developers seeking to level up! <span className="hidden-600">Topics range from frontend, backend, devops, and career development!</span></p>
                <a className="button" target="_blank" rel="noreferrer" href="https://codechefs.dev">Listen Now</a>
              </div>
              <div className="logo-right">
                <a href="https://codechefs.dev" target="_blank" rel="noreferrer">
                  <img src={codeChefsLogo} alt="code chefs logo"/>
                </a>
              </div>
            </div>
          </section>
          {/* <section className="section">
            <div className="newsletter-wrapper">
              <div className="text-left">
                <h2>Vincent's Newsletter</h2>
                <p>I run a newsletter and publish Javascript related content!</p>
                <button>
                  <a target="_blank" rel="noreferrer" href="https://codechefs.dev">Listen Now</a>
                </button>
              </div>
              <div className="logo-right">
                <img src={codeChefsLogo} alt="code chefs logo"/>
              </div>
            </div>
          </section> */}


          {/* <section className="section">
            <h2>Open Source Projects</h2>
            <ProjectListing projects={projects} />
          </section> */}

          {/* <section className="section">
            <h2>Podcasts</h2>
            <SimpleListing simple data={podcasts} />
          </section> */}

          {/* <section className="section">
            <h2>Speaking</h2>
            <SimpleListing simple data={speaking} />
          </section> */}

          {/* <section className="section">
            <h2>{`Other People's Opinions`}</h2>
            <div className="quotations">
              {quotes.map(quote => (
                <blockquote className="quotation">
                  <p>{quote.quote}</p>
                  <cite>— {quote.name}</cite>
                </blockquote>
              ))}
            </div>
          </section> */}

          <section className="newsletter-section section">
            <h2>Newsletter</h2>
            <p>
              Join me in my journey exploring the realm of software development. Frontend, Backend, DevOps and more.
              Unsubscribe whenever. No spam unless it's the Hawaiian kind 🥩
            </p>
            <NewsletterForm />
          </section>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 7
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    vincentBlue: allImageSharp(filter: {
      fluid:{ originalName: {eq:"vincent_2.png"}}
    }) {
      edges {
        node {
          id
          # fluid(base64Width: 10, traceSVG: {}) {
          #   ...GatsbyImageSharpFluid
          # }
          fixed(width: 200, height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;
