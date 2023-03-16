import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

export default class Speaking extends Component {
  state = {
    // searchTerm: '',
    // currentCategories: [],
    // posts: this.props.data.posts.edges,
    // filteredPosts: this.props.data.posts.edges,
  }

  render() {

    return (
      <Layout>
        <Helmet title={`Articles – ${config.siteTitle}`} />
        <SEO />
        <div className="container">
          <h1>Work with me 😃</h1>
          <p>Here's some of the projects I worked on over the years, feel free to ask me what I built for each of these</p>
          <p>I specialize in building custom fullstack applications in NodeJS / React</p>
          <p>Shoot me an email if your interested in working with me <a href="mailto:hello@vincentntang.com">here</a></p>
          <div>
            <h1>Clients</h1>
            <h1>Hackathon Projects</h1>
            <h1>Codepen Apps</h1>
          </div>
        </div>
      </Layout>
    )
  }
}

// Automatically passes as props to react component
export const pageQuery = graphql`
  query {
    allSpeakingDataJson {
      edges {
        node {
          # path
          location
          venue
          fullImg {
            childImageSharp {
              fluid(maxWidth: 300, maxHeight: 220) {
                src
                srcSet
                aspectRatio
                tracedSVG
              }
              fixed(width: 400, height: 200) {
                src
                srcSet
                height
                width
                tracedSVG
              }
            }
          }
          date
          title
          links {
            demo
            repo
            slides
            website
            audio
            video
          }
        }
      }
    }
  }
`
