# GLAB Games

Free browser games that install on a phone and work offline.

| Game | Play |
|---|---|
| Tic-Tac-Toe: play the phone (Easy, Medium, Unbeatable) or a friend | [tictactoe/](tictactoe/) |
| Blackjack Coach: basic strategy, card counting and bet sizing, practice money only | [blackjack/](blackjack/) |

## Install on a phone

Open a game's page, then:

- **iPhone (Safari):** Share → **Add to Home Screen**
- **Android (Chrome):** menu (⋮) → **Install app**

Open it once from the home-screen icon while online. After that it plays with no internet.

## How this repo is updated

The games are developed in a separate private repository and copied here
when they change. Each game's `sw.js` has a `VERSION`; it changes with every
update so installed copies pick up the new version next time they're online.
