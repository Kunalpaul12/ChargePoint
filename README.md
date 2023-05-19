# Overview

### This application is build on react native version 0.71.8 with node version 18.10.0 ⚛️

# Demo

Android

!["Android"](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTM1OGZkYTU2YThmYWUyMzMxY2FhOGNkM2FmZTE5YTU0YWQ2NjI0NSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/00AgUF7IV0ZahNL4AW/giphy-downsized-large.gif)

IOS

!["IOS"](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTM1NzU0ODMxYTU3NGExZGZmY2M3YTk5M2UxN2JhYjNhODU3OTQxZSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/JmmcCfRPVVGi8V6ZjM/giphy-downsized-large.gifhttps://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTM1NzU0ODMxYTU3NGExZGZmY2M3YTk5M2UxN2JhYjNhODU3OTQxZSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/JmmcCfRPVVGi8V6ZjM/giphy-downsized-large.gif)

# Installation Requirements

### Android

- Android Studio
- Jdk

### Ios

- Xcode ( >= version 14 )

### Homebrew for mac

- Open the Terminal app.
- Type ruby -e "\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" You’ll see messages in the Terminal explaining what you need to do to complete the installation process. You can learn more about Homebrew at the Homebrew website.

### Npm

brew install node

### Yarn

npm install --global yarn

# Run

- In the root of project type yarn (this will install all the dependency)

- To run on android (cd android && ./gradlew clean && cd .. && npx react-native run-android)

- To run on ios (cd ios && pod deintegrate && npx pod-install && xcodebuild clean && cd .. && npx react-native run-ios)

# Debug Build

A debug build apk (assignment.apk) for android is at the root of the project
