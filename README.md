# Tab & User Activity Monitor

A browser-based React app that logs detailed user activity events inside a styled terminal interface. This tool detects tab switches, focus/blur, inactivity, clipboard access, text selection, and keystrokes while the tab is active.

[![Live Site](https://img.shields.io/badge/Live%20Site-Click%20Here-green?style=flat-square&logo=vercel)](https://tab-user-activity-monitor.vercel.app/)

![Screenshot_113](https://github.com/user-attachments/assets/644bdb0f-8b67-449e-8089-fff0c2909810)


---

## Features

- Detects when a user:
  - Switches tabs or minimizes the window
  - Leaves or returns to the browser window
  - Goes idle for more than 60 seconds
  - Copies content (and logs clipboard content)
  - Highlights (selects) any text
  - Presses any key (while tab is active)
- Styled like a Windows terminal for a nostalgic interface
- Real-time logging with auto-scrolling output box

---

## Technology Stack

- React
- JavaScript (ES6+)
- CSS (custom + utility styles)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation and Running Locally

```bash
# Clone the repository
git clone https://github.com/your-username/tab-activity-monitor.git
cd tab-activity-monitor

# Install dependencies
npm install

# Start the development server
npm start
