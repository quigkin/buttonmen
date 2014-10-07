Button Men
==========

A "pet project" implementation in nodejs of [Button Men](http://www.cheapass.com/node/39) from [Cheapass Games](http://www.cheapass.com/).

[![Build Status](https://travis-ci.org/quigkin/buttonmen.svg?branch=master)](https://travis-ci.org/quigkin/buttonmen)


MVP
-----------
* [client] Upgrade to latest stable socketio on client and server; tired of old doc
* [client] On accepting a fight; put both fighters in the same room
* [client] Ensure re-entering Lobby gets all events but only once

v1
-----------
* [client] Style it to match fighter artwork
* [client] Allow gawkers to join a fight's room
* [client] Custom confirmation and alert modals

v2
-----------
* [client] Persistent user information on server
* [client] Friends list with invite to game (email?)
* [client] Enemies list with block messages from this person
* [server] Spam protection
* [server] Optimize sending large updates of rooms and names by only sending diffs
* [client] Handle large lists

Bugs
-----------


Socket Info
-----------

Every connection gets its own socket id assigned

'' contains all socket ids (connections)
'/Lobby' and the uuid rooms contain all socket ids (connections) in that room

    { '':
      [ 'J_WlhNwlb2ZivkVjDY89',
        'chU-Q91-DnSLckwEDY8_',
        'zBE1dkeJbvuGzg_QDY9A' ],
      '/Lobby': [ 'J_WlhNwlb2ZivkVjDY89' ],
      '/b51695f4-e036-4de1-b0b2-abafc18cda70': [ 'chU-Q91-DnSLckwEDY8_' ],
      '/c5e89444-c171-485c-be0e-42e6d7e5543c': [ 'zBE1dkeJbvuGzg_QDY9A' ] }

