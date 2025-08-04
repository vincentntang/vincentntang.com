import React from 'react'
import { Link } from 'gatsby'

import floppy from '../assets/floppylogo.png'
import react from '../../content/thumbnails/react.png'
import css from '../../content/thumbnails/css-new.png'
import js from '../../content/thumbnails/js.png'
import mac from '../../content/thumbnails/apple.png'
import mario from '../../content/thumbnails/mario.png'
import bash from '../../content/thumbnails/bash.png'
import tn from '../../content/thumbnails/tn.png'
import accordion from '../../content/images/keyboardaccordionlogo.png'
import animorphs from '../../content/thumbnails/animorphslogo.png'
import pc from '../../content/thumbnails/computer.png'
import bluesky from '../../content/thumbnails/bluesky.png'
import rss from '../../content/thumbnails/rss.png'
import newMoon from '../../content/images/new-moon.svg'
import tampaDevs from '../../content/images/tampadevs.png'
import tampaDevsShip from '../../content/images/tampadevship.png'
import github from '../../content/thumbnails/github.png'


export const Sidebar = () => {
  const codingGuides = [
    {
      url: '/custom-podcast-site-gatsby-react/',
      title: 'Custom GatsbyJS Podcast Site',
      icon: react,
    },
  ]

  const leadershipWriteups = [
    {
      url: '/attract-right-people-invitation',
      title: 'Attract the right people - open invitation',
      icon: tampaDevs,
    },
    {
      url: '/dealing-with-impostor-syndrome/',
      title: 'Dealing with impostor syndrome',
      icon: tampaDevs,
    },
    {
      url: '/calendar-planning-software-meetup/',
      title: 'Calendar planning software meetup',
      icon: tampaDevs,
    }
  ]
  const funStuff = [
    {
      url: '/designing-coolest-embroidered-hat/',
      title: 'Designing the coolest embroidered hat ever',
      icon: tampaDevsShip
    },
    {
      url: '/custom-bandana/',
      title: 'Building a custom bandana',
      icon: tampaDevsShip,
    },
    {
      url: '/designing-the-tampa-devs-logo/',
      title: 'Designing the tampa devs logo',
      icon: tampaDevsShip,
    },
  ]

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <h2>About Me</h2>
        <div className="sidebar-content">
          <p>
            I'm <Link to="/me">Vincent</Link>, software engineer and community organizer. This is my digital garden. 🌱
          </p>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>Stay Connected</h2>
        <p className="sidebar-links">
          {/* <a
            href="https://vincentntang.substack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={newMoon} alt="Email Newsletter" height="16" width="16" />
            Email Newsletter
          </a> */}
          <a
            href="https://github.com/vincentntang"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="Github" height="16" width="16" />
            Github
          </a>
          {/* <a
            href="https://go.bsky.app/SmEWb8G"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={bluesky} alt="Bluesky" height="16" width="16" />
            Bluesky Starter Pack
          </a> */}
          <a href="/rss.xml">
            <img src={rss} alt="RSS" height="16" width="16" />
            RSS Feed
          </a>
        </p>
      </section>

      <section className="sidebar-section">
        <h2>Coding</h2>
        <nav className="sidebar-menu">
          {codingGuides.map((link) => (
            <Link key={link.url} to={link.url} activeClassName="active">
              {link.icon ? (
                <img src={link.icon} alt={link.title} />
              ) : (
                <div style={{ height: '16px', width: '16px' }} />
              )}
              {link.title}
            </Link>
          ))}
        </nav>
      </section>

      <section className="sidebar-section">
        <h2>Fun Stuff</h2>
        <nav className="sidebar-menu">
          {funStuff.map((link) => (
            <Link key={link.url} to={link.url} activeClassName="active">
              {link.icon && <img src={link.icon} alt={link.title} />}
              {link.title}
            </Link>
          ))}
        </nav>
      </section>

      <section className="sidebar-section">
        <h2>Leadership Writeups</h2>
        <nav className="sidebar-menu">
          {leadershipWriteups.map((link) => (
            <Link key={link.url} to={link.url} activeClassName="active">
              {link.icon && <img src={link.icon} alt={link.title} />}
              {link.title}
            </Link>
          ))}
        </nav>
      </section>
    </aside>
  )
}
