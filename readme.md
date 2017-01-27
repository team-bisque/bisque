# Go Outside

A small app to preserve your sanity during the workday and maximize long-term productivity. Go Outside encourages you to take a full, rejuvenating break by locking certain parts of your browser during designated break times. It also [does some other stuff! TBD!].

# Instructions

```
git clone https://github.com/dgodow/go-outside
npm install
npm start

Check out your Chrome extensions and ensure that Go Outside is enabled. Click on the app icon to trigger a cycle of tab creation and removal (an artificially accelerated version of "break" vs. "work" time).
```

# Thoughts on This MVP

### Our Goal

Create a Chrome extension that will generate a new tab during "break time" (artificially set at 10 seconds) and simultaneously keep you from creating new tabs or browsing previously created tabs. 

### Which Parts Work

- It creates a new tab
- It keeps you from accessing other tabs

### Which Parts Don't Work

Our dashboard page (the new tab the app creates during "break time") is supposed to show you how long of a break is remaining (a timer). It should also fill in whether you're on break or at work.

### Open/Unresolved Questions

We're now thinking of:
- tracking browser activity during work times to track how "distracted" you are
- including some d3 charts that will track how distracted you've been over time as well as your total minutes worked and breaked (broked?)

### Particular Parts of the Code We'd Like You To Look At

The React portions, specifically the ChromeApp and Timer portions, which were hacked together pretty quickly for MVP (per Dan's instructions).
