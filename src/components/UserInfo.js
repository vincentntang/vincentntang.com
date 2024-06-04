import React, { Component } from 'react';
import Img from 'gatsby-image';
import newsletterIcon from "../images/newsletter.svg"
import ScrollAnimation from 'react-animate-on-scroll';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
  }

  renderNewsletterButton = () => {
    return (
      <a className="button button-newsletter mr-2" target="_blank" rel="noreferrer" href="https://vincentntang.substack.com">
        <div className="newsletter-wrapper">
          <img src={newsletterIcon} alt="newsletter icon" />
          <span>Join Newsletter</span>
        </div>
      </a>
    )
  }

  render() {
    const vincentBlue = this.props.gatsbyImg;
    const { isHomePage } = this.props;
    console.log(isHomePage, "ishomePage");
    return (
      <div className="hero-full">
        <div className="container hero-container">
          <div className="image-left">
            <Img key={1} fixed={vincentBlue.node.fixed} />
          </div>
          <div className="content-right">
            <h1 className="text-36">Hi <span className={isHomePage ? "hand-wave" : ""}>👋</span></h1>
            <Img className="display-right-float" key={2} fixed={vincentBlue.node.fixed} />
            <p className="about-user">I'm Vincent Tang, a fullstack software developer specialized in product design. I run a coding podcast called <a target="_blank" rel="noreferrer" href="https://tampadevs.com">Code Chefs</a> and I am formerly the founder of <a target="_blank" rel="noreferrer" href="https://tampadevs.com">Tampa Devs</a></p>
            {isHomePage ?
              this.renderNewsletterButton() :
              <ScrollAnimation animateOnce offset={100} animateIn="bounce" style={{ display: "inline-block" }} className="width-100-600">
                {this.renderNewsletterButton()}
              </ScrollAnimation>
            }
            <a className="button mr-2" target="_blank" rel="noreferrer" href="https://twitter.com/vincentntang">Twitter</a>
            <a className="button mr-2" target="_blank" rel="noreferrer" href="https://github.com/vincentntang">Github</a>
          </div>
        </div>
      </div>
    );
  }
}