# Pooped app

A simple mobile app that keeps track of your bowel movements (poop).
Inspired by my friend who has problems with IBS.

## Brief Description

The Pooped app allows a user to record and visualize their bowel movements to keep track of their gut health. A user is able to record the particular day with one of the stool types based on the [Bristol Stool chart](https://www.webmd.com/digestive-disorders/poop-chart-bristol-stool-scale). The user can also choose one of the following tabs to view their data in a graphical form (bar and pie chart): Today, Week, Month, Year.

## Screen Shots
<div>
  <img src="/assets/Login_screen-removebg.png" width="200" height="400" />
  <img src="/assets/Add_data_screen-removebg.png" width="200" height="400" />
  <img src="/assets/Week_screen-removebg.png" width="200" height="400" />
  <img src="/assets/Year_Screen-removebg.png" width="200" height="400" />
</div>

## Tech Stack

This application was developed using React Native with Expo, Victory for data visualization, and Firebase to store the data.

## Getting Started

To test the app on your local machine, fork/clone the repo.

### Intall Expo iOS Simulator
- `npm install -g expo-cli`
- Follow instructions to install the iOS simulator: https://docs.expo.io/workflow/ios-simulator/
- `npm start` to start the Expo server
- Open the app on the iOS simulator

### Using the Pooped app
- Create an account by signing up or login using your email and password
- Add new data by clicking the 'Add data' button on the top right of the screen
  - Choose the date and time (default is the current date and time)
  - Choose the stool type (see the Bristol stool chart below)
- Select any of the tabs (Today, Week, Month, Year) to view data as a bar graph or pie chart
- Select the User tab to logout

## Acknowledgments

- [React Native with Firebase](https://www.freecodecamp.org/news/react-native-firebase-tutorial/)

