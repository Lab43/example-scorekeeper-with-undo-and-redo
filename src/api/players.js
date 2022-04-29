export const getPlayers = () => {

  /*

  We'd normally use fetch to make an API call and return a promise, like this:

  return fetch('/api/players').then((res) => res.json());

  But since this is a demo with no backend we'll fake the API call, with a 0.5s delay so we can test the loading state.

  */

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
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
    }, 500);
  });
}
