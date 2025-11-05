# My CS50x Final Project: Custom Website Generator

Hello and welcome to my first official web project! 🎉 This is my final project for **CS50x: Introduction to Computer Science**, and it's something I'm really proud of. For the first time, I’ve built an entire web application from scratch—**a website generator** where you can create your very own customizable website!

## What is this project?

In a nutshell, this is a web app that lets you generate simple HTML websites based on your preferences. You can choose:
- **Website type** (e.g., Portfolio, Blog)
- **Color theme** (Light or Dark)
- **Sections** (About, Gallery, Contact)

The app will then dynamically generate an HTML page with the sections you selected, styled with Bootstrap, and stored in a simple **SQLite** database. You’ll also be able to look back at a history of the websites you’ve created, so you can keep track of all your awesome creations.

## Features

- **Create Custom Websites**: Select the type of website, its color theme, and the sections you want to include. The app generates HTML based on your choices.
- **Database Storage**: Every website you create is saved to an SQLite database, making it easy to revisit them later.
- **Responsive Design**: Bootstrap is used to make sure all generated websites look great on any screen size.
- **Easy-to-Use Interface**: The app is super user-friendly with simple forms to help you quickly generate your site.
- **History Tracking**: View a list of all your previous website creations along with details like website type, color theme, and selected sections.

## How it works

1. **Fill out the form**: Start by choosing the type of website you want (portfolio, blog, etc.), pick a color theme, and select sections like About, Gallery, or Contact.

2. **Database Storage**: Once you submit the form, your choices are saved in an **SQLite database**. This allows you to go back and see a history of all the websites you've created.

3. **Website Generation**: After you submit the form, the app will generate a custom HTML file with your chosen details. The page will be styled using **Bootstrap 4**, and you can download or view the page right away.

4. **View Past Creations**: You can also visit the **History page** to view all the websites you’ve made so far, including the sections you’ve selected for each one.

## Tech Stack

- **Flask**: This Python web framework powers the back-end of the app, handling everything from routing to database queries.
- **SQLite**: I used SQLite to store the websites users create. It's lightweight, easy to use, and perfect for this project.
- **HTML & CSS**: HTML is used to structure the websites, and CSS is for styling. I also used **Bootstrap** for responsive design.
- **JavaScript**: Minimal JavaScript is included, mostly to handle form submission and interactivity.
- **Bootstrap 4**: This framework was used to make sure everything looks great on any screen size (phones, tablets, desktops).

## Project Structure

Here’s a quick overview of how the project is organized:

.
├── app.py                  # The main Python file
├── websites.db             # The SQLite database that stores all the website data
├── templates/              # This folder contains the HTML templates
│   ├── base.html           # The base layout for the app (navbar, footer, etc.)
│   ├── index.html          # The homepage where users create their website
│   ├── generated.html      # The page showing the generated HTML for your website
│   └── history.html        # The page displaying all saved websites
└── static/                 # This folder contains a single CSS file
    └── style.css           # Custom CSS file for the styling of the web app


## Future Improvements

While I’m really proud of what I’ve built so far, there are a few areas I plan to improve and expand upon as I continue to work on this project. These potential enhancements will make the application more robust, flexible, and user-friendly:

1. **User Authentication**:
   Currently, users can create websites, but the app doesn’t support user authentication. Adding login and registration functionality would allow users to save their websites under their accounts and access them from any device, providing a more personalized experience.

2. **Increased Customization Options**:
   Right now, the website generator allows users to select a few basic options (e.g., website type, theme, and sections). To improve flexibility, I plan to add more customization features, such as the ability to choose fonts, upload custom images, and change layout styles.

3. **Enhanced Error Handling**:
   The current version of the app does not have much in the way of error handling. In the future, I want to implement better form validation, ensuring users are prompted with clear messages when fields are incomplete or incorrectly filled. This will create a smoother experience for users, particularly those who may not be familiar with web development.

4. **More Templates and Themes**:
   Right now, users can choose between a few predefined website types and color themes. To make the app more appealing and versatile, I plan to add a wider variety of templates, themes, and sections (e.g., Testimonials, Blog, Services) to give users more control over their website's design.

5. **Mobile Optimization**:
   Although the app uses **Bootstrap 4** for responsive design, I plan to further optimize the generated websites for mobile devices. This could involve fine-tuning the CSS or adding custom media queries to improve the user experience on smaller screens.

6. **Website Preview Before Generation**:
   Another feature I’d like to implement is a preview of the website before it is generated. Users would be able to see a mock-up of their website based on their selected options, which would help them visualize the final result before committing to the creation process.

7. **Use of openai in python**:
    Another feature i came across is to import packages related to the openai and artificial intelligence which convert any given prompt for a website and within seconds you have the exact website.
    In my project i only provide template for a generic website which can cut some slack off people who wanna start a website but don't wanna do it from scratch.

These improvements will help take this project to the next level, and I’m excited to continue working on it as I learn more and gain experience in web development.

## Final Thoughts
This is my very first "official" project outside of the problem sets in CS50, and it was such a fun and rewarding experience. I learned a lot along the way, especially how to integrate databases with Flask, work with HTML and CSS, and make something functional that others can use. I hope you enjoy it as much as I enjoyed building it!
