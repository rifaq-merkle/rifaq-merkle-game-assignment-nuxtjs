# Rifaq Merkle Games Assignment

A Nuxt 4 and TypeScript app to browse games from the Merkle Games API.

- **Home page:** shows 15 random games released between 2015 and 2017. They are sorted by average rating (highest first). You can also sort by release date (newest first).
- **Game page:** shows the title, rating, image, game info (description, release date, developer, publisher, platform, genre), the reviews, and a back button. On mobile everything stacks in one column.

Built with Nuxt 4, TypeScript, SCSS, the Nunito font and Vitest. No UI libraries.

## Requirements

- Node.js 24 or newer
- The Merkle Games API running locally (default `http://localhost:8000`)

## Getting started

1. Start the API from the `server` folder:

```bash
cd server
npm install
npm run dev
```

2. Install and start the client:

```bash
cd client
npm install
npm run dev
```

3. Open `http://localhost:3000`.

## Scripts

- `npm run dev`: start the development server
- `npm run build` for production build
- `npm test`: run the tests
- `npm run test:coverage`: run the tests with a coverage report
- `npm run lint`: check the code with ESLint
- `npm run format` and `npm run format:check`: format the code with Prettier, or only check it
- `npm run typecheck`: check the TypeScript and Vue types

## Folder structure

```text
client/
  app/
    assets/scss/    Variables, one mixin and global base styles
    components/     GameCard, GameInfo, ReviewList, SortSelect, BaseImage, ErrorState
    composables/    useGamesService (API setup), useRandomGames (home page data)
    layouts/        Page layout (header, main, footer)
    mappers/        Turn raw API data into app data
    pages/          index.vue (home) and games/[id].vue (game page)
    services/       Games service (random games, single game)
    types/          API types and app types
    utils/          Date, rating and sort helpers
    error.vue       Not found and error page
  tests/            Tests and shared test data
```

### Components

- `GameCard`: one game in the home page grid. The whole card is a link.
- `SortSelect`: the sort dropdown on the home page.
- `GameInfo`: the info card on the game page.
- `ReviewList`: the list of reviews on the game page.
- `BaseImage`: an image that shows a placeholder when it is missing or broken.
- `ErrorState`: an error message with a "Try again" button.

## How it works

### Data flow

Pages call composables. Composables call the games service. The service calls the API with `$fetch` and uses the mapper to turn the raw data into app data. Pages and components never see raw API data, so if the API changes, only `types/api.ts` and the mapper need to change.

### Home page

The API cannot filter games by date and does not return ratings in the list, so the home page works in three steps:

1. Get all game ids released between 2015 and 2017.
2. Shuffle them and load the first 15 games at the same time. Each game includes its reviews, so the average rating is calculated in the app.
3. If a game fails to load, it is replaced by the next random game. This way the page still shows 15 games when the API is unstable.

The random games are saved with `useState`. The server picks them once, and the browser reuses them, so there is no second request. They also stay the same when you come back from a game page. Reloading the page picks new games.

Sorting happens in the browser. The sort choice is saved in the URL (`?sort=releaseDate`), so it survives a reload and can be shared. Games without a rating or date are always shown last.

### Game page

One API call returns everything: game info, genre, developer, publisher, images and reviews. If the id is not a number, or the API returns 404, the "Page not found" page is shown. Other errors show a "Try again" button. The back button goes back in browser history when possible (keeping the sort and scroll position), otherwise it opens the home page.

## Styling

Plain SCSS. Browser defaults are used where they are good enough (buttons, the sort dropdown, headings, lists).

- `_variables.scss`: colors, radius, page width and the desktop breakpoint
- `_mixins.scss`: `card` (white box with border and rounded corners)
- `main.scss`: base styles for the body, links, focus outline and the page container

Variables and mixins are available in every component without importing them. Each component has its own scoped styles.

The game grid adapts to the screen width on its own (one column on phones, up to four on wide screens). The Nunito font is loaded through Nuxt Fonts.

## Accessibility

- Header, main and footer landmarks, one `h1` per page and a clear heading order
- One link per game card, so keyboard users tab once per game
- A native dropdown with a visible label for sorting
- Ratings are plain text, for example "7.4/10 (12 ratings)"
- Release dates use the `time` element
- A visible focus outline and good text contrast
- Loading messages use `role="status"`, errors use `role="alert"`
- Images have empty alt text because the game title is right next to them

## Performance

- Server side rendering, so the page arrives with data already in it
- The 15 games on the home page load in parallel
- Images have a fixed size (no layout jumps) and load lazily on the home page
- Images are requested at the size they are shown
- The font is self hosted with only the weights in use

## Testing

Vitest with the Nuxt test environment. A small set of 9 tests focuses on the business logic (about 90% line coverage):

- **Games service:** picks random games from the date range, and replaces games that fail to load
- **Mapper:** maps API data, calculates the average rating and fills in missing review data
- **Sorting:** sorts by rating or release date, puts games without a value last and sorts ties by title
- **Home page:** asks for 15 games from 2015 to 2017, sorts by rating by default and switches to release date; shows an error and reloads on "Try again"
- **Game card:** shows the game summary and links to the game page
- **Game page:** shows all details, reviews and the back button; shows a "Try again" state when the API fails

## What I'd improve with more time

- **Loading skeletons.** The loading state is just text. Skeleton cards with the same size as the real cards would look nicer.
- **A "Show me other games" button.** At the moment you have to reload the page to get new random games. A button would be easier to find.
- **More tests.** I kept the tests focused on the business logic. I'd like to add tests for `BaseImage` (the placeholder), `error.vue`, the back button and the sort in the URL, plus a few end-to-end tests with Playwright and an automatic accessibility.
- **More filters.** Sorting both ways (lowest rating first, oldest first) and filtering by platform or genre would make the home page more useful.
- **Long review lists.** All reviews are shown at once. For games with many reviews, a "Show more" button would keep the page short.
- **Light and dark mode.** The app only has a light theme. A dark mode that follows the system setting, with a button to switch between the two, would make the app more comfortable to use.
- **Advanced accessibility.** The basics are covered, but I'd like to go further: test the app with screen readers, add a "Skip to content" link, announce sort changes to screen reader users and respect the "reduced motion" setting.
- **A better UI design.** I had limited time for this assignment, so I focused on the features and the code. With more time, I'd improve the visual design with more polished cards, better spacing and small details that make the app feel more finished.
