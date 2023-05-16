let uuid = 1;
let notifications = [
  {
    id: ++uuid,
    from: {
      name: "Jacob Thompson",
      avatar: "../assets/images/avatar-jacob-thompson.webp",
    },
    message: {
      type: "comment",
      text: "commented on your picture",
      reference: {
        text: "",
        link: "../assets/images/image-chess.webp",
      },
    },
    time: new Date(new Date().getTime() - 8831232),
    seen: true,
  },
  {
    id: ++uuid,
    from: {
      name: "Rizky Hasanuddin",
      avatar: "../assets/images/avatar-rizky-hasanuddin.webp",
    },
    time: new Date(new Date().getTime() - 19231232),
    seen: true,
    message: {
      type: "message",
      text: "sent you a private message",
      reference: {
        link: "",
        text: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
      },
    },
  },
  {
    id: ++uuid,
    from: {
      name: "Kimberly Smith",
      avatar: "../assets/images/avatar-kimberly-smith.webp",
    },
    time: new Date(new Date().getTime() - 7231232),
    seen: false,
    message: {
      type: "post",
      text: "reacted to your recent post",
      reference: {
        link: "",
        text: "My first tournament today!",
      },
    },
  },
  {
    id: ++uuid,
    from: {
      name: "Nathan Peterson",
      avatar: "../assets/images/avatar-nathan-peterson.webp",
    },
    time: new Date(new Date().getTime() - 539302000),
    seen: false,
    message: {
      type: "follow",
      text: "followed you",
    },
  },
  {
    id: ++uuid,
    from: {
      name: "Anna Kim",
      avatar: "../assets/images/avatar-anna-kim.webp",
    },
    message: {
      type: "group",
      text: "has joined your group",
      reference: "Chess Club",
    },
    // message: "left the group Chess Club",
    time: new Date(new Date().getTime() - 534202000),
    seen: true,
  },
  {
    id: ++uuid,
    from: {
      name: "Anna Kim",
      avatar: "../assets/images/avatar-anna-kim.webp",
    },
    message: {
      type: "reaction",
      text: "reacted on your recent post",
      reference: "5 end-game strategies to increase your win rate",
    },
    // message: "left the group Chess Club",
    time: new Date(new Date().getTime() - 50302000),
    seen: true,
  },
];

const getMessageElementByType = (message) => {
  switch (message.type) {
    case "follow":
      return message.text;
    case "comment":
      return `
              ${message.text}
              <img src=${message.reference.link} width="50" height="50" class="notification__comment-image active-state"/>
              `;
    case "group":
      return `
              ${message.text}
              <span class="active-state">${message.reference}</span>
              `;
    case "reaction":
      return `
              ${message.text}
            <span class="gray reference">${message.reference}</span>
            `;
    default:
      return message.text;
  }
};

const setNotificationsCount = () => {
  const counter = document.querySelector(".header__count");
  const count = notifications.reduce((a, b) => a + !b.seen, 0);
  counter.textContent = count;
};

const handleMessageClick = (id) => {
  const message = notifications.find((el) => el.id === id);
  message.seen = true;
  const messageElem = document.querySelector(
    '.notification[id="' + id.toString() + '"]'
  );
  messageElem.classList.remove("unseen");
  setNotificationsCount();
};

const handleButtonClick = () => {
  notifications = notifications.map((el) => ({ ...el, seen: true }));
  renderMessages();
  setNotificationsCount();
};

const addButtonListener = () => {
  const button = document.querySelector(".header-btn");
  button.addEventListener("click", handleButtonClick);
};

const getRelativeTime = (date) => {
  const now = new Date();
  const delta = now - date;

  if (delta < 60000) {
    // Less than 1 minute
    const seconds = Math.floor(delta / 1000);
    return seconds + "s ago";
  } else if (delta < 3600000) {
    // Less than 1 hour
    const minutes = Math.floor(delta / 60000);
    return minutes + "m ago";
  } else if (delta < 86400000) {
    // Less than 1 day
    const hours = Math.floor(delta / 3600000);
    return hours + "h ago";
  } else if (delta < 604800000) {
    // Less than 1 week
    const days = Math.floor(delta / 86400000);
    return days + "d ago";
  } else {
    const weeks = Math.floor(delta / 604800000);
    return weeks + "w ago";
  }
};

const getMessageTextElement = (text) => {
  return `
          <div class="notification__message-text gray">
            ${text}
          </div>
          `;
};

const renderMessages = () => {
  const messagesContainer = document.querySelector(".notifications");

  const sortedNotifications = notifications.sort(
    (a, b) => b.time.getTime() - a.time.getTime()
  );

  const messagesHTML = sortedNotifications
    .map((noti) => {
      return `<div class="notification ${noti.seen ? "" : "unseen"}" id=${
        noti.id
      }
              onclick="handleMessageClick(${noti.id})">
              <img
                src=${noti.from.avatar}
                alt=${noti.from.name}
                class="sender-image"
              />
              <div class="notification__info">
                <div class="notification__message">
                  <b class="active-state"> ${noti.from.name} </b>
                  ${getMessageElementByType(noti.message)}
                </div>

                <span class="notification__time gray"> ${getRelativeTime(
                  noti.time
                )} </span>
                ${
                  noti.message.type === "message"
                    ? getMessageTextElement(noti.message.reference.text)
                    : ""
                }
                </div>
            </div>
            `;
    })
    .join("");

  messagesContainer.innerHTML = messagesHTML;
};
window.addEventListener("DOMContentLoaded", () => {
  renderMessages();
  addButtonListener();
  setNotificationsCount();
});
