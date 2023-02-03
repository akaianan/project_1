
### Getting Started

### The Frontend

To run the frontend server, please navigate to the `frontend` folder and run `npm install`, then run `npm start` to start the ReactJS app.

### The Backend 

To run the backend server, please navigate to the `backend` folder and run `npm install`, then run `npm start` to start the backend.

To view the API interface for the backend you can navigate to the base URL of the backend (`http://localhost:5005`). 

The port that the backend runs on is in `frontend/src/config.js`. You can change the port in this file. 

# 2. The function of renting house

# 2.1 Login and Register
 * Users are able to choose `LOG IN` or `SIGN UP` in home page.
 * Users are able to input their `email` and `password` to log in, and if submission fails, a reasonable error message will be shown.
 * Users are able to input their `email`, `name`, `password` and `confirm password` to register, and if the two passwords are not the same, users will receive a popup error before submission. If there are some other errors, the error messages will be shown.
 * When users have been logged in , they are able to see the `LOGOUT` button, and they will return to the `login` page when they click on it. They can also see the `HOST LISTINGS` button, and they are able to see all the listings created by themselves when they click on it. They can also see the `ALL LISTINGS` button, and they are able to see all the listings which are created by others and have been published when they click on it.

# 2.2 Creating & Editing & Deleting & Publishing a Hosted Listing 
* For logged in users, they are able to create their own listings (as a host), and the listing includes `Title` `Property Type` `Number of beds (not bedrooms)` `Number of bathrooms` `Thumbnail of the listing` `SVG rating of the listing (based on user ratings)` `Number of total reviews` `Price (per night)`, and they are also able to upload the picture.
* They are also able to edit the following elements of the listings they created: `Listing Title` `Listing Address` `Listing Price (per night)` `Listing Thumbnail`
`Property Type` `Number of bathrooms on the property` `Property bedrooms` `Property amenities`
* Users are able to delete the listings they created.
* Users are able to publish their listings, and the published listings are visible to all other users.
* Users are able to unpublish their listings, then the listings are not visible to all other users.

# 2.3 Landing Page: Listings and Search
* Users are able to see all other published listings in landing page, and they are able to see the listings in detail when they click on the button `get detail`.
* Users are able to click on the button `get gilter` to search listings according to the features of `title or address` `number of bedrooms` `date range` `price` in landing page, when they get the listings they want, they are also able to see the listings in detail when they click on the button `get detail`.

# 2.4 Viewing and Booking Listings 
 * When users see a listing in detail, they are able to click on the button `book it` to book this listing, then they are able to input the date range of booking they want, and they are able to submit it after inputing the date range. They are also able to see their booking history of this listing in this page.
 * After submitting it, they are able to see the status of booking is `pending`, and the hosts are able to `accept` or `decline` this booking on the host listings page. When the hosts choose `accept`, the users are able to comment and rate（1-5）to this listing, then the comment and rate will be shown on the detail of the listing.
 * If the hosts choose `decline`, the user are also able to book this listing again.
 * Users are able to delete their booking in booking history.

# 2.5 Removing a Listing, Managing Booking Requests 
 * When the host unpublish the listing, those who had made bookings for this listing will no longer be able to view it on their booking history.
 * The host is able to see these information of the listings they created in host listings page:
	* How many days has the listing been published
	* How much profit has this listing made for the owner
	* How many days has the listing been booked
 * The host is also able to `accept` or `decline` the booking on this page, and they are able to see all the booked history of all the listings they created in this page.
	


