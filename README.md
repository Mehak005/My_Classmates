# Student Connect - Interactive Student Directory

## Deployed Webpage
- URL: https://mehak005.github.io/My_Classmates/


## Project Description

Student Connect is a ReactJS-based student directory that allows users to:
- **Create, Modify, and Delete** student profiles.
- **Like other students’ profiles** (likes increase on button click).
- **View profiles in a Table format** with sorting and filtering.
- **Dark Mode Support** for an improved UI experience.
- **Persistent Data Storage** using Local Storage.

The app **dynamically renders student profiles** using React’s `useState` and `.map()`,  
is **styled with Bootstrap**, and is **deployed on GitHub Pages**.

## Local Storage Integration
Student data and dark mode preferences are **saved in Local Storage**, ensuring:
- Profiles persist across page reloads.
- Dark mode settings remain unchanged between sessions.
- User modifications (add, edit, delete, like) are stored automatically.

This enables a seamless experience without needing a backend.




## Generative AI Usage

## How I used AI?
I used generative AI to get:
- Guidance on React and Bootstrap best practices.
- Clarifications on component structuring for better maintainability.
- Suggestions for improving table  filtering.

## AI-Generated Parts
- **Code Structuring & Optimization**: Helped refine component breakdown (`Card.js`, `TableView.js`, `ProfileForm.js`).
- **Best Practices for State Management**: Suggested using `useState` and `useEffect` for profile storage.
- **Local Storage Implementation**: Assisted in persisting profiles and dark mode settings.
- **Styling Improvements**: Provided ideas on Bootstrap-based UI enhancements.

### **My Own Contributions**
- **Designed and implemented the entire project from scratch.**
- **Developed full UI & functionality**, including profile creation, editing, deletion, and likes.
- **Integrated Local Storage** for persistent profiles and dark mode.
- **Implemented form validation** to prevent invalid input.
- **Debugged, refined, and deployed the final version independently.**
- **Handled all project structuring, improvements, and real-world usability considerations.**

## Data Table Integration

To enhance the profile listing experience, I integrated **TanStack Table** into my application. 

## Why I Chose TanStack Table?
1. **Lightweight** – Unlike AG-Grid or MUI, it does not add unnecessary dependencies.
2. **Highly Customizable** – Gives full control over table styling and functionality.
3. **React-Optimized** – Built specifically for React, unlike DataTables.net, which requires jQuery.


 