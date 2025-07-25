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

export const Sidebar = () => {
  const guides = [
    {
      url: '/setting-up-a-brand-new-mac-for-development',
      title: 'macOS Setup for Devs',
      icon: mac,
    },
    {
      url: '/overview-of-css-concepts/',
      title: 'CSS Guidebook',
      icon: css,
    },
    {
      url: '/react-architecture-directory-structure',
      title: 'React Architecture',
      icon: react,
    },
    {
      url: '/asynchronous-javascript-event-loop-callbacks-promises-async-await/',
      title: 'The Event Loop',
      icon: js,
    },
    {
      url: '/how-to-create-and-use-bash-scripts/',
      title: 'Bash Scripts',
      icon: bash,
    },
  ]

  const projectWriteups = [
    {
      url: '/musical-instrument-web-audio-api',
      title: 'Keyboard Accordion',
      icon: accordion,
    },
    {
      url: '/how-to-create-a-memory-game-super-mario-with-plain-javascript',
      title: 'SNES Memory Game',
      icon: mario,
    },
    {
      url: '/writing-an-emulator-in-javascript-chip8/',
      title: 'Chip-8 Emulator',
      icon: js,
    },
    { url: '/building-takenote', title: 'TakeNote App', icon: tn },
  ]
  const funStuff = [
    {
      url: '/animorphs',
      title: 'The Lore of Animorphs',
      icon: animorphs,
    },
    {
      url: '/building-my-first-pc/',
      title: 'Building My First PC',
      icon: pc,
    },
    {
      url: '/2024-into-2025',
      title: 'My Latest Year in Review',
      icon: floppy,
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
          <a
            href="https://taniarascia.substack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={newMoon} alt="Email Newsletter" height="16" width="16" />
            Email Newsletter
          </a>
          <a
            href="https://go.bsky.app/SmEWb8G"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={bluesky} alt="Bluesky" height="16" width="16" />
            Bluesky Starter Pack
          </a>
          <a href="/rss.xml">
            <img src={rss} alt="RSS" height="16" width="16" />
            RSS Feed
          </a>
        </p>
      </section>

      <section className="sidebar-section">
        <h2>Guides</h2>
        <nav className="sidebar-menu">
          {guides.map((link) => (
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
        <h2>Project Writeups</h2>
        <nav className="sidebar-menu">
          {projectWriteups.map((link) => (
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
