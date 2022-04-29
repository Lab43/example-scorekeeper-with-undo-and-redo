/*

We'd normally use fetch to make API calls and return promises, like this:

export const getPlayers = () => {
  return fetch('/api/players').then((res) => res.json());
}

But since this is a demo with no backend we'll fake the API calls, with a 0.5s delay so we can test loading states.

*/


const fakeIt = (data) => new Promise((resolve) => {
  setTimeout(() => resolve(data), 500);
});


export const getPlayers = () => fakeIt({
  // return some fake players
  players: [
    {
      name: 'Wayne',
      score: 5,
      removed: false,
    },
    {
      name: 'Emma',
      score: 6,
      removed: false,
    },
    {
      name: 'Ratna',
      score: 3,
      removed: false,
    }
  ]
});

export const createPlayer = fakeIt;

export const updatePlayer = (index, update) => fakeIt({...index, ...update});
