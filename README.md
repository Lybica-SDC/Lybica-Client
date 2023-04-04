# Sharingan Shop

A fashionable e-commerce site built for a pleasent user experience.

## Authors

[Nam Nguyen](https://www.github.com/nnguye47) - [Overview](#overview)\
[Aidan Fisher](https://www.github.com/aidanFisher97) - [Related Items & Your Outfit](#related-items)\
[Andrew Ihn](https://www.github.com/roormade) - [Questions & Answers](#qa)\
[Kyle Stevens](https://www.github.com/kylestevens32) - [Ratings & Reviews](#ratings-reviews)


## Built With
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)![Tailwind CSS](https://img.shields.io/badge/tailwindcss-ff69b4?style=for-the-badge&logo=tailwindcss&logoColor=white)![Axios](https://img.shields.io/badge/axios-CA4245?style=for-the-badge&logo=axios&logoColor=white)

## Key Features
- An Overview section displaying a product and its styles.
- A Related Items and Comparison section where the user can view related items and build an outfit.
- A Q&A section used for asking, answering, and browsing user generated questions.
- A Ratings and Reviews section for writing, browsing, and filtering reviews.

## Overview
#### Features
- Interactive gallery with scrolling features
- Product information displaying the price, category, reviews, and name
- Interactive style selector to change the gallery images
- Size/Quantity selectors to add item to cart
- **Zoom In feature in progress**

![overview-readme](readMeImages/Overview/overview.jpg)

<a name="related-items"></a>
## Related Items & Your Outfit
#### Features
- A carousel displaying a list of products related to the item in overview.
- A feature that allows the user to add items to a user-specific list called 'Your Outfit'.
- A modal to compare a related item to the overview item.

<img src="readMeImages/RIC/relatedItems.png"/>

<details>
    <summary>See Comparison Details</summary>

<img src="readMeImages/RIC/modal.png" width="600"/>

</details>

<a name="qa"></a>
## Questions & Answers
#### Features
- Search bar capable of filtering the Q&A list after 3 characters
- See More buttons render remaining Q&A
- Question and Answer modals to add user-based questions and answers

<img src="readMeImages/QA/QAList.png"/>

<details>
    <summary>See Q&A Details</summary>

<img src="readMeImages/QA/QAForm.png"/>

</details>


<a name="ratings-reviews"></a>
## Ratings & Reviews
#### Features
- Breakdown of ratings based on certain characteristics and review data
- List of reviews that can be filtered by rating and sorted by different factors
- A form for adding reviews


![fec-rr-readme](readMeImages/RatingsAndReviews/RatingsAndReviews.jpg)


<details>
    <summary>See R&R Form</summary>


<img src="readMeImages/RatingsAndReviews/FormWithValidation.jpg" width="600"/>


</details>


## Getting Started

Installation
- Clone the repository
    ```
        git clone https://github.com/SharinganTech/FEC-Main.git
    ```
- Install the dependencies
    ```
        npm install
    ```
- Copy example.env file and rename to .env with the following within
    ```
        API_TOKEN='Insert API Token'
    ```
- Run the following scripts
    ```
        npm run start
    ```
