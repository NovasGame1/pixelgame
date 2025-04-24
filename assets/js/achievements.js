// assets/js/achievements.js

// 1) Achievement definitions
const ACHIEVEMENTS = [
  {
    id: "welcome",
    title: "Welcome Aboard!",
    desc: "Created your account",
    icon: "assets/images/achievements/welcome.png"
  },
  {
    id: "first_bit",
    title: "First Bits!",
    desc: "Earned your first bit",
    icon: "assets/images/achievements/first_bit.png"
  },
  {
    id: "socializer",
    title: "Socializer",
    desc: "Befriended your first player",
    icon: "assets/images/achievements/socializer.png"
  },
  {
    id: "collector",
    title: "Collector",
    desc: "Bought your first item from the Shop",
    icon: "assets/images/achievements/collector.png"
  },
  // … add more as you like …
];

// 2) Unlock an achievement for the current user
function unlockAchievement(achId) {
  const username = localStorage.getItem("profileUsername");
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  if (!username || !userData[username]) return;

  const user = userData[username];
  user.achievements = user.achievements || [];
  if (!user.achievements.includes(achId)) {
    user.achievements.push(achId);
    localStorage.setItem("userData", JSON.stringify(userData));
    // Optional: notify user
    alert(`🏆 Achievement Unlocked: ${ACHIEVEMENTS.find(a=>a.id===achId).title}`);
  }
}

// 3) Call this once on profile load to ensure base achievements
function checkBaseAchievements() {
  const username = localStorage.getItem("profileUsername");
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  if (!username || !userData[username]) return;
  const user = userData[username];

  // welcome
  unlockAchievement("welcome");

  // first_bit
  if ((user.bits ?? 0) > 0) unlockAchievement("first_bit");

  // socializer
  if ((user.friends || []).length > 0) unlockAchievement("socializer");

  // collector
  if (user.shirtsEquipped || user.pantsEquipped) unlockAchievement("collector");
}

// 4) Render achievements on the Profile page
function renderAchievements() {
  const container = document.getElementById("achievementsList");
  const username = localStorage.getItem("profileUsername");
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  if (!username || !userData[username]) {
    container.innerHTML = "<p>Log in to see achievements.</p>";
    return;
  }
  const unlocked = userData[username].achievements || [];
  container.innerHTML = ACHIEVEMENTS.map(a => {
    const isUnlocked = unlocked.includes(a.id);
    return `
      <div class="ach-card ${isUnlocked ? "unlocked" : "locked"}">
        <img src="${a.icon}" alt="${a.title}" class="ach-icon"${isUnlocked ? "" : " style='filter: grayscale(100%)'"}>
        <div class="ach-info">
          <strong>${a.title}</strong>
          <p>${isUnlocked ? a.desc : "???"}</p>
        </div>
      </div>
    `;
  }).join("");
}
