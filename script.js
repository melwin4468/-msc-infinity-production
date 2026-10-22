
/* =========================================
   MSC INFINITY PRODUCTION
   Website interactions and video gallery
========================================= */


/* MOBILE NAVIGATION */

const navToggle = document.getElementById("navToggle");
const navigation = document.getElementById("navigation");

if (navToggle && navigation) {
  navToggle.addEventListener("click", () => {
    const opened = navigation.classList.toggle("open");

    navToggle.setAttribute("aria-expanded", String(opened));
    navToggle.setAttribute(
      "aria-label",
      opened ? "Close navigation menu" : "Open navigation menu"
    );
  });

  // Close mobile menu after clicking a navigation link
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}


/* YOUTUBE SONG LIST
   Change the titles to your actual song titles.
   Add additional song objects to include more videos.
*/

const songs = [
  {
    title: "Featured Music Video",
    category: "MSC INFINITY ORIGINAL",
    url: "https://youtu.be/3lOz1tTKbBw"
  },

  {
    title: "Devotional Music Video",
    category: "MSC INFINITY DEVOTIONAL",
    url: "https://youtu.be/BSe8bQNKd3w"
  },

  {
    title: "Listen to More of Our Music",
    category: "MORE SONGS TO LISTEN",
    url: "https://youtu.be/0h22WB69RT8"
  }

  /*
  ADD A SONG HERE:

  ,{
    title: "Your Actual Song Title",
    category: "ROMANTIC MUSIC",
    url: "https://youtu.be/PASTE_VIDEO_ID_HERE"
  }
  */
];


/* EXTRACT VIDEO ID FROM YOUTUBE LINK */

function getYouTubeId(url) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace("www.", "");

    if (host === "youtu.be") {
      return parsedUrl.pathname.slice(1).split("/")[0];
    }

    if (host.includes("youtube.com")) {
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/")[2] || "";
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.split("/")[2] || "";
      }

      return parsedUrl.searchParams.get("v") || "";
    }

    return "";
  } catch (error) {
    return "";
  }
}


/* BUILD THE VIDEO CARDS */

const musicGrid = document.getElementById("musicGrid");

if (musicGrid) {
  const validSongs = songs.filter((song) => getYouTubeId(song.url));

  if (validSongs.length === 0) {
    musicGrid.innerHTML =
      '<p class="empty-message">Music videos will be added here soon.</p>';
  } else {
    musicGrid.innerHTML = validSongs.map((song) => {
      const videoId = getYouTubeId(song.url);
      const thumbnail =
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      return `
        <article class="music-card">

          <a
            class="music-poster"
            href="${song.url}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch ${song.title} on YouTube"
          >
            <img
              src="${thumbnail}"
              alt="${song.title} video thumbnail"
              loading="lazy"
            >

            <span class="poster-play" aria-hidden="true">▶</span>
          </a>

          <div class="music-info">
            <p class="section-kicker">${song.category}</p>
            <h3>${song.title}</h3>

            <a
              href="${song.url}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube ↗
            </a>
          </div>

        </article>
      `;
    }).join("");
  }
}


/* AUTOMATIC FOOTER YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}