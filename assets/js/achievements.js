// assets/js/achievements.js

// 1) Definitions
const ACHIEVEMENTS = [
  { id: "welcome",     title: "Welcome Aboard!", desc: "Created your account", icon: "assets/images/achievements/welcome.png" },
  { id: "first_bit",   title: "First Bits!",     desc: "Earned your first bit",   icon: "assets/images/achievements/first_bit.png" },
  { id: "socializer",  title: "Socializer",      desc: "Befriended a player",     icon: "assets/images/achievements/socializer.png" },
  { id: "collector",   title: "Collector",       desc: "Bought your first item",   icon: "assets/images/achievements/collector.png" },
  // …add more here…
];

// 2) Unlock badge
function unlockAchievement(achId) {
  const user = JSON.parse(localStorage.getItem("userData"))?.[localStorage.getItem("profileUsername")];
  if (!user) return;
  user.achievements = user.achievements || [];
  if (!user.achievements.includes(achId)) {
    user.achievements.push(achId);
    localStorage.setItem("userData", JSON.stringify(JSON.parse(localStorage.getItem("userData"))));
    alert(`🏆 Achievement Unlocked: ${ACHIEVEMENTS.find(a=>a.id===achId).title}`);
  }
}

// 3) Render badges (locked ones are greyed out)
function renderAchievements() {
  const container = document.getElementById("achievementsList");
  const user = JSON.parse(localStorage.getItem("userData"))?.[localStorage.getItem("profileUsername")];
  const unlocked = user?.achievements || [];
  container.innerHTML = ACHIEVEMENTS.map(a => {
    const done = unlocked.includes(a.id);
    return `
      <div class="ach-card ${done?"unlocked":"locked"}">
        <img src="${a.icon}" class="ach-icon" ${done?"":`style="filter:grayscale(100%)"`}>
        <div class="ach-info">
          <strong>${a.title}</strong>
          <p>${done? a.desc : "Locked"}</p>
        </div>
      </div>
    `;
  }).join("");
}
