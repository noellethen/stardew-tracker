# 🐔 Pelican Town Tracker

A cozy, interactive web application designed to help **Stardew Valley** players track villager schedules, gift preferences, and birthdays without breaking immersion. Built with **React** and styled to mimic the in-game UI.

## ✨ Features

  * **🔍 Live Search:** Instantly filter villagers by name.
  * **📍 Schedule Tracking:** View villager locations based on weather (Rainy/Sunny) and days of the week.
  * **🎁 Gift Guide:**
      * Detailed lists of **Loves** (💖), **Likes** (👍), and **Dislikes** (❌).
      * Visual icons for every item using the Stardew Wiki API.
      * Dedicated **"Universals"** mode for quick reference of universal loves/hates.
  * **🎨 Immersive Game UI:**
      * Custom **Pixel Cursor** (Pointer & Hand animations).
      * Authentic "Dialogue Box" aesthetic with **VT323** pixel font.
      * Stardew-themed scrollbars and buttons.
      * Interactive **Sound Effects** (Click & Background Music) with a toggle switch.
  * **📱 Responsive Design:** Flexbox layout that adapts to the screen size (locked viewport, no window scrolling).

## 🛠️ Tech Stack

  * **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
  * **Styling:** Pure CSS (Custom Scrollbars, Flexbox, Pixel Art Rendering)
  * **Data:** JSON-based local database (extracted from game files/wiki)
  * **Assets:** Dynamic hotlinking to [Stardew Valley Wiki](https://stardewvalleywiki.com/) for item icons.

## Credits

  * **Game Assets & Design Inspiration:** Stardew Valley by [ConcernedApe](https://twitter.com/ConcernedApe).
  * **Data Sources:** Stardew Valley Wiki & Community Data Extracts.
  * **Font:** [VT323](https://fonts.google.com/specimen/VT323) from Google Fonts.