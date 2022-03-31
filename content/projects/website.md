---
title: "Website"
date: 2022-02-08T13:48:15-06:00
draft: true
summary: Description of this website
---

While the main purpose of this website was to have a place to showcase the cool
things I build, it's also the first thing that I've actually deployed to the
world at large, and it feels pretty cool!

### Front end

Nothing fancy here. The front end is just basic HTML, CSS, and Javascript.
(Although I will admit I'm a little proud of my waving svg stickperson).

### Backend

Content for each post is stored in a MySQL database, and retrieved using RESTful
services developed in NodeJS.

???? These services are read only. To update the content, I wrote a
configureable utility that maps the content from a local directory and pushes it
to the database.

### Infrastructure

This site is running from a Node app deployed on a Digital Ocean droplet. I
followed a number of very helpful Digital Ocean tutorials for all the initial
server setup (ssh access and firewall, configuring the domain name, deploying a
Node app, etc.)

The working directory for this app is a git repository, which I have cloned onto
my local machine. This way, I am able to easily push local changes to my
droplet. When I'm ready to release them, all I need to do is log in to the
droplet and merge the changes to the master branch.

---
