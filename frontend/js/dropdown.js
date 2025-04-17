const profileButton = document.getElementById("profile-button");
const profileMenu = document.getElementById("profile-menu");

profileButton.addEventListener("click", () => {
    profileMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
    const target = e.target;
    if (!profileButton.contains(target) && !profileMenu.contains(target)) {
        profileMenu.classList.add("hidden");
    }
});