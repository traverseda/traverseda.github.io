---
date: '2025-02-08T11:15:09-04:00'
draft: false
title: 'Docker Services for homelabs'
ShowToc: true
ShowReadingTime: true
tags:
  - sysadmin
---

or "how to sysadmin for small business in 2025 using containers" if you're not of this homelab generation.

Docker is a very powerful tool, and there are a near infinite number of ways you can
manage your docker configurations. There are also a lot of tools that will
claim to make this easier, or provide more of an all-in-one solutions.

As of my writing this in early 2025, none of those tools seem to really work
well and I still find myself having to go in and do a lot of stuff manually. Maybe
someday one of these projects will hit the magic formula, but for now it's just 
too clunky the instant you go off the happy path. But you could try

 * CasaOS
 * yunohost
 * yacht
 * portainer
 * umbrel
 * HexOs
 * TrueNAS
 * cosmos-cloud

And I'm sure many more. I consider these to be, so far, largely dead ends.
The main reason for this is the ecosystem, they're all using the same open 
source web apps as everyone else, and all of these web apps have warts and 
rough edges that are going to need to be customized by you. They make this 
kind of cusotmization hard.

If you just want a basic deployment I think cosmos-cloud was my favorite
so far. It integrates some single-sign-on and doesn't seem to break in too
many weird ways. A bit tricky to convert some weird unsupported service into
something that works with it.

If you're using kubernetes... good for you, that seems like a lot of work.
You can probably ignore all of this.

If you're using podman or some other containerization technology, this is more
general principles and as long as it supports docker-compose you should be fine.

If you need special security measures like 2 factor auth, or high-availability, deploying
and maintaining this kind of stack becomes a lot harder.


# Principles and lessons learned

>“The primary feature for easy maintenance is locality: Locality is that characteristic of source code that enables a programmer to understand that source by looking at only a small portion of it.”

– Richard Gabriel

---

 * Clustering isn't worth the effort

It's some cool stuff, but it's a huge amount of effort. There's no reason to spend
time on this unless/until you have a good reliable distributed filesystem, or a fast
centralized file store and you're happy with that single point of failure.

 * Volumes are a trap

Why would you want to use volumes? Because you're connecting to a cluster or other
type of remote filesystem. Other than that they just make stuff harder and violate
locality-of-behavior.

 * Services should be self-contained

All your bind mounts should be relative to the docker file. You should be able to rsync
that folder to another server and have it just work. This will help you with backups,
migrations, and it also just generally makes it easier to deal with.

Likewise don't have hard dependencies on things like external postgres databases.
I know having all your services talk to one postgres instance would be more efficient,
but unfortunately it just doesn't play well with how docker is designed.

 * Where possible configure through environment variables

This is part of the [12 factor app](https://12factor.net/) design Principles.
Many popular apps do not support configuration through env variables, later on 
we'll discuss how I manage those situations.


# Directory structure

I create a new top-level `/services/` folder. This is not official unix specs, but I don't feel
compelled to store all this in `/var/local/data` like you're probably supposed to. A 
top level /services/ folder makes these services easy to find and easy to interact with.

I also often have a `~/services/` folder on my laptop or personal machine. With the 
way I structure our services the actual folder is a matter of taste, but if you're reading
this article and don't have a strong taste for something else, consider using `/services`.

---

Inside of /services/ I have a folder for each individual service. What do I mean by a service?
I mean a self-contained docker-compose that doesn't rely on any outside resources to start up.

An example deployment could look like this:

  * /services/
    * traefik/
      * docker-compose.yaml
      * data_letsencrypt/
      * cache_certs/
    * nextcloud/
      * docker-compose.yaml
      * config_nextcloud.php
      * data_nextcloud-apps/
      * data_nextcloud-config/
      * data_postgres/
      * data_user-files/
      * data_nextcloud-html/
      * data_redis/

I don't tie traefik or nextcloud together, they're each standalone services that can be
stopped and started independently.

You noticed some extra folders in here. Some `data_*` folders, a `config_*` file, and a
`cache_*` folder. I have a specific naming convention for these because it makes it easier
to deal with in version control.

## `data` folders

You should be able to find data folders with `data_*`.

These folders should be added to your gitignore. They include actual runtime data
for your app. Things like the actual files postgres uses to store your data.

I keep most of these kinds of files on my fast SSD, but `data_user-files/` is a symlink
to a larger array.

## `cache` folders

You should be able to find cache folders with `cache_*`.

These folders I treat the same way as data folders, adding them to gitignore. I name them differently
so that I can clear all cache files quickly and easily.

## `config` files

You should be able to find all top-level config files with `config_*`.

Sometimes I want easier access to a config file, or I want to store it explicitly in git.

There's no significant different between `data_nextcloud-config/config.php` and `config_nextcloud.php`,
other than how it interacts with your version control system. If the config file was hand-customized
you probably want to keep it in version control.

When possible you *should* be using environment variables for config, but many applications don't support that,
or don't support it well.

# An aside on copier templates

I have some thoughts on using an exciting new templating system called [copier](https://copier.readthedocs.io/en/stable/)
to better manage this style of configuration file, but I haven't done it yet.
Copier essentially let's you do a `git pull` from a template, re-applying the template while still
respecting your local changes while also applying new template variables.

# Reverse proxy

A reverse proxy sits in front of all your websites and puts them on a sub-domain. There are a lot of options,
the standard seems to be settling on traefik.

A "traditional" reverse proxy would be a web server like nginx, apache, lighttpd, configured to route http connections
to your sub-apps. Traefik goes one step further and connects to your docker daemon,
inspecting the labels on your containers to see how the connection should be configured.
There are some pretty basic features, like LDAP auth, that are behind a paywall.
You may find yourself reaching for community plugins early.

There are some alternetives. `nginx-proxy-manager` is a frontend around nginx,
it doesn't do any sort of auto-configuration for you, and I've found the code quality to be
less than perfect. I'd probably go with just nginx and config files.

`caddy-docker` seems like a viable alternative to traefik, I like how they structure
things better. I haven't switched because there aren't a lot of examples and I don't have 
a great understanding of how it maps labels to config.

## Example deployment with traefik


```yaml
#services/traefik/docker-compose.yaml

networks:
  proxy:
    external: true

services:
  traefik:
    image: "traefik:v3.1"
    restart: always
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
        # - "--log.level=DEBUG"  
      - "--providers.docker.exposedbydefault=false"
      - "--entryPoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"
      - "--entrypoints.web.http.redirections.entryPoint.scheme=https"
      - "--entrypoints.web.http.redirections.entrypoint.permanent=true"
      - "--entryPoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.tlschallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.email=you@example.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      # We use this to enable ldap auth in free traefik
      - "--experimental.plugins.ldapAuth.modulename=github.com/wiltonsr/ldapAuth"
      - "--experimental.plugins.ldapAuth.version=v0.1.8"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080" #Monitor port for ensuring everything is set up properly
    volumes:
      - "./data_letsecnrypt/:/letsencrypt/"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
    networks:
      - proxy
```


```yaml
#services/example/docker-compose.yaml

networks:
  proxy:
    external: true

services:
  whoami:
    image: "traefik/whoami"
    restart: always
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.whoami.rule=Host(`whoami.yourdomain.com`)"
      - "traefik.http.routers.whoami.entrypoints=websecure"
      - "traefik.http.routers.whoami.tls.certresolver=letsencrypt"
    networks:
      - proxy
```

# Centralized authentication

## technologies

Authentication is also a huge rabbit hole you can fall down. Let's go over the major technologies involved.

 * LDAP

LDAP is most commonly deployed as active directory along with a bunch of other services. In LDAP you
send the password to the LDAP server and it checks it. This is generally considered bad Because
it involves the client collecting the password, and you don't know for sure if it's keeping a copy
of that password for itself.

There are plenty of apps that can *only* support something like LDAP though, and we trust the apps we're
installing. I tried to get by without LDAP for a while, but too many programs just won't
work with any method.

 * OpenID

This is how things like "sign-in with google" works. It redirects you to a web page, does some magic
with tokens, and at no point do you need to share your password with a "third party". This lack of
password sharing is more secure, it's the only way a company *could* implement this kind of
auth. But many apps just aren't designed in a way that's compatible with it.

 * SAML, kerberos, etc

These are more enterprise scale technologies you should probably ignore as long as you can.

## example deployment with LLDAP


```yaml
#services/lldap/docker-compose.yaml

networks:
  proxy:
    external: true

services:
  lldap:
    image: lldap/lldap:stable
    restart: always
    ports:
      - "17170:17170"
    volumes:
      - "./data_lldap:/data"
    environment:
      - UID=1000
      - GID=1000
      - TZ=America/Halifax
      #Generate a random secret with `python3 -c "import secrets; print(secrets.token_urlsafe(32))"`
      - LLDAP_JWT_SECRET=<secret1>
      - LLDAP_KEY_SEED=<secret2>
      - LLDAP_LDAP_BASE_DN=dc=yourdomain,dc=com
      #- LLDAP_HTTP_URL=https://auth.youdomain.com
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.lldap.rule=Host(`auth.yourdomain.com`)"
      - "traefik.http.routers.lldap.entrypoints=websecure"
      - "traefik.http.routers.lldap.tls.certresolver=letsencrypt"
      - "traefik.http.services.lldap.loadbalancer.server.port=17170"
    networks:
      - proxy
```


```yaml
#services/example_secure/docker-compose.yaml

networks:
  proxy:
    external: true

services:
  whoami:
    image: "traefik/whoami"
    restart: always
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.whoami_secure.rule=Host(`whoami_secure.yourdomain.com`)"
      - "traefik.http.routers.whoami_secure.entrypoints=websecure"
      - "traefik.http.routers.whoami_secure.tls.certresolver=letsencrypt"
      - traefik.http.routers.whoami_secure.middlewares=ldap_auth
      # ldapAuth Options=================================================================
      - traefik.http.middlewares.ldap_auth.plugin.ldapAuth.enabled=true
      - traefik.http.middlewares.ldap_auth.plugin.ldapAuth.url=ldap://lldap
      - traefik.http.middlewares.ldap_auth.plugin.ldapAuth.port=3890
      - traefik.http.middlewares.ldap_auth.plugin.ldapAuth.baseDN=ou=people,dc=yourdomain,dc=com
      - traefik.http.middlewares.ldap_auth.plugin.ldapAuth.attribute=uid
    networks:
      - proxy
```
