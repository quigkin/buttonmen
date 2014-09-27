Button Men
==========

A "pet project" implementation in nodejs of [Button Men](http://www.cheapass.com/node/39) from [Cheapass Games](http://www.cheapass.com/).

[![Build Status](https://travis-ci.org/quigkin/buttonmen.svg?branch=master)](https://travis-ci.org/quigkin/buttonmen)


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

