let defaultLanguage = navigator.language.toLocaleLowerCase().includes("ar")
  ? "ar"
  : "en";
if (localStorage.getItem("Lang")) {
  defaultLanguage = localStorage.getItem("Lang");
}
let MembersJsonFile = null;
let LocaleEnKeys = null;
let LocaleArKeys = null;

const MembersGrid = document.querySelector(".members-grid");

MembersGrid.textContent = ""; // Clearing so if we change languages we have a new slate to plob our members on

const LoadLocales = () => {
  let translations = defaultLanguage == "en" ? LocaleEnKeys : LocaleArKeys;
  Object.keys(translations).forEach((key) => {
    // Find elements with class name matching the key
    const elements = document.getElementsByClassName(key);
    Array.from(elements).forEach((element) => {
      element.innerHTML = translations[key];
      //   .replaceAll("&lt;", "<")
      //   .replaceAll("&gt;", ">");
    });
  });
  console.log("Translated Succsesfully!");
};

const FetchLocales = () => {
  fetch(`/locales/${defaultLanguage}.json`)
    .then((response) => response.json())
    .then((translations) => {
      defaultLanguage == "en"
        ? (LocaleEnKeys = translations)
        : (LocaleArKeys = translations);
      LoadLocales();
    })
    .catch((error) => {
      console.error("Error loading locale file:", error);
    });
};

const LoadMembers = () => {
  let members = MembersJsonFile;

  members.Members.forEach((member) => {
    const memberDiv = document.createElement("div");
    memberDiv.innerHTML = `<div class="member-card">
            <div class="member-avatar">
              <img
                src="${member.Image}"
                alt="Team Member"
                class="member-logo"
              />
            </div>
            <h3>${
              defaultLanguage == "en" ? member.Name : member["Name-Arabic"]
            }</h3>
            <p class="member-role">${
              defaultLanguage == "en" ? member.Role : member["Role-Arabic"]
            }</p>
          </div>`;
    MembersGrid.appendChild(memberDiv);
  });
};

const SetLanguage = () => {
  if (defaultLanguage == "ar") {
    document.body.dir = "rtl";
    document.body.lang = "ar"; // for css purposes
  } else {
    document.body.dir = "ltr";
    document.body.lang = "en"; // for css purposes
  }

  // Fetch the locale file and apply translations

  if (defaultLanguage.toLocaleLowerCase() == "en") {
    LocaleEnKeys == null ? FetchLocales() : LoadLocales();
  } else if (defaultLanguage.toLocaleLowerCase() == "ar") {
    LocaleArKeys == null ? FetchLocales() : LoadLocales();
  }

  // Apply The locale file and apply translations for the members

  if (MembersJsonFile == null) {
    fetch("/Members.json")
      .then((response) => response.json())
      .then((members) => {
        MembersJsonFile = members;
        LoadMembers();
        console.log("Members loaded Succsesfully! From Fetch");
      });
  } else {
    LoadMembers();
    console.log("Members loaded Succsesfully! From Memory");
  }
};

// Figuring out RTL LTR
const ChangeLanguage = () => {
  defaultLanguage == "en" ? (defaultLanguage = "ar") : (defaultLanguage = "en");
  localStorage.setItem("Lang", defaultLanguage);
  SetLanguage();
};

SetLanguage(); // Set the language on page load
