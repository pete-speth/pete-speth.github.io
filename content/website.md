# This website

### Front end
Nothing fancy here. The front end is just basic HTML, CSS, and Javascript. (Although I will admit I'm a little proud of my waving svg stickperson).

### Backend
Content for each post is stored in a MySQL database, and retrieved using rest services developed in NodeJS. These services are read only. To update the content, I wrote a configureable utility that maps the content from a local directory and pushes it to the database.

### Infrastructure
This app is deployed using Docker on a Digital Ocean droplet.
- Spin up Ubuntu server on droplet
- Initial setup (create user, enable firewall)
- Configure domain name
- Install and set up Nginx
- Configure HTTPS for server
