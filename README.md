# showcase-gists
Showcase Gists on your profile

## Goal of this project

The goal of this project is to create **dynamic** fun/useful Gists and pin them on your profile.

## How it works

The entry file will determined which jobs you want to add : 
```js
// Jobs to load
const jobs = [
  'lastActivity', // Last GitHub activity
  'lastTweet', // Last tweet
  'WakaTime' // Total hours of coding
]
```

for example "lastActivity" will fetch the last GitHub activity, format the content and create or update the Gist.

> You will need to fill the .env file based on which jobs you enabled.
> 
> **PERSONAL_ACCESS_TOKEN** and **GITHUB_USERNAME** are required.


### Output

![preview](./.github/preview.png)