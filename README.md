# Bastille
Bastille is a small JavaScript library that enables the prevention of the default browser back button functionality. This means that the user cannot leave the page through the back button anymore. Instead, Bastille now dispatches an event every time the back button is pressed, which then can be manually handled by the JavaScript. Normal back button functionality can be restored when needed. Bastille requires the History API to function, but doesn't ever manipulate the page's URL or spams the user's history. This library solely focuses on the back button and provides no special functionality to the forward button.

This library is meant to, without much complication, add back button functionality to web pages that usually would not have it, such as single-page applications. It is not intended to be used to annoy or get in the way of the user, but should instead complement a web experience, based on users' intuition of how the back button should work, for example when aiding in navigation.

## Installation
To install, simply include the file in your HTML:
```html
<script src="path/to/bastille.js"></script>
```

## Usage
Usage is as straight-forward as possible. Enable Bastille, and disable the default browser back button functionality using:
```javascript
Bastille.enable();
```
The default back button can be re-enabled using:
```javascript
Bastille.disable();
```
A general guideline is to call `disable()` when the user has reach the outer-most level of navigation, in which they would expect to leave the page upon clicking the back button.

While Bastille is enabled, presses of the back button can be caught in the following ways:
```javascript
Bastille.addEventListener('back', ...);
// or
Bastille.onback = ...;
```