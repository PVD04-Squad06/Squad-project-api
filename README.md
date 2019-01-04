
---DESCRIPTION:

This back-end project, is a server side Express.js API to service our client side e-commerce single page web application (SPA). This API was developed by Antonio Keo, Greg Ryan, Rakshya K., and Michael Rai.


Info on the front end:

A customer (user) is able to set up a profile with an email and password. The user can see all products, add products to their cart, checkout and sign out.

---REPOSITORY:

The link to the frontend repository can be found at:
https://github.com/PVD04-Squad06/Squad-project-client

---WEBSITE:

Technologies Used:

HTML, CSS & BOOTSTRAP, JavaScript, Express.js, MongoDB, plug-in with mLab with version control by GitHub.

---Live URL: https://polar-meadow-90741.herokuapp.com/

---CATALOG OF ROUTES (paths and methods)

Outside of example routes that is kept for reference, there are four (4) defined routes: cart, order, product and user. Once a user is signed in they are then given access to an empty cart. A user can browse and select products to be added to their cart. When the user checks out their cart an order is created and stored in their history on the database.

Cart: Cart has access to index (getting an empty cart), show (displaying items in cart), patch (updating items in cart), post (putting items in cart). Cart does not have access to destroy because of the nature of this e-commerce application, a user should not be able to delete their cart. They can empty it.

Order: Order has access to post, index, and show their order as a whole.

Product: Product has access to index/show and two different GET requests to display women and men's clothing,

User: User has acess to standart user actions sign-up/sign-in, change password, and sign-out via delete, post and patch.


--Future Iterations:

This product is not fully functional. In future iterations we will the user will be able to retrieve past purchases, a wishlist and be recognized via username after sign in.

Among our overall planning documents, wireframes, erd and wireframes; our MVP Standards can be seen here:
https://www.evernote.com/l/AKXK3YZk0LhH3aTagYmiMofsDHm3T_Oz9js
