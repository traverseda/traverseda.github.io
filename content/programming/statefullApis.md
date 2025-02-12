---
date: '2025-02-11T22:31:07-04:00'
draft: true
title: "The state of our API's"
ShowToc: true
---

# Musings on statelessness and remote procedure calls

Epistemic-status: Gathering my thoughts

# Why even bother with statelessness?

HTTP is, at it's core, a stateless protocol. You can think of it as an
remote-procedure-call mechanism, a way to call a function over the internet.
Thinking about these protocols as if they were language features can be
elucidating. HTTP is essentially a functional, side-effect free, RPC mechanism.
This comes with a number of benefits, the big one is that you can apply
memoization (caching).

You could argue that the reason HTTP is a stateless protocol is to enable that
kind of caching, the web wouldn't work without it and there are a number of
features intended to make caching, and cache invalidation, easier.

Of course that kind of functional side-effect free style of programming isn't
just good for caching. It also means that we can send the request to any number
of servers to perform load-balancing. The benefits even partially
extend to less "pure" web apps, which we can archive and replay using tools 
like the internet archive's `WARC` files, at least for simple apps that don't
rely on too much server-side processing.

On the whole, stateless protocols make a lot of sense and enable a lot of
performance optimization that would otherwise be impractical.

# How do we actually do statelessness?

Of course we can't all live in the land of pure-side-effect-free-functions. At
some point you have to start layering on state. By far the most common way to do
this is to create a little bundle of state, and have the users include a token
in each of their requests that entagles their request with that bundle of
statefull data. We call that bundle of data the users session.

This is where we start to run into issues. Load balancing essentially means
sending the request to a random server in a pool, and session data should be, at
least in principle, atomic. There should be one single-source of truth.

How do you ensure there's only one single source of truth, while also keeping
things performant? The same way you do in any concurrent system. You ~~throw
everything into postgres and let it handle it~~ use standard locking and
concurrency models, or if you're feeling fancy use something more exotic like
CRDTs or raft-consensus.

## Standard locking
