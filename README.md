# MAJOR
A simple bug tracker to identify **Major** malfunctions and keep track of issues.

# APPROACH
I wanted to demonstrate some of the skills I acquired at General Assembly to build something that I believe would be useful for general business purposes. I set out to build a no-frills bug tracker that would allow end-users to post issues for a support team to address and the whole thing would be managed by one or more administrators. I wanted to experiment with permissions and conditional rendering by the use of authentication. Essentially I wanted to push myself to build something with what I felt like was real functionality, beyond basic-CRUD apps.

# TECHNOLOGIES
This project utilizes the MERN stack; or MongoDB, Express, React.js, and Node.js. This also uses axios to make API calls to the backend. 

Additionally I employed the following technologies to develop this web application:
-Bcrypt
-CORS
-CryptoJS
-JSONWebToken
-Mongoose
-Nodemailer
-Toastify

# FEATURES
MAJOR offers some good features in a simple package:
-It allows administrators to manage access to the site using nodemailer to send unique signup links to unverified users. On the very some page they can delete or approve requests. 
-Users can post issues and edit their own issues, without worrying about any other end-users editing their post. 
-All posts can be edited or deleted by the support or admin user groups if necessary. Support or admin users can close issues, which will remove the ability for those issues to be edited and record the user who closed the issue.
-Admin users can assign a support staff member to an issue, and support team can add, edit or delete work items associated with a given issue. Admin team can also reassign the issue if necessary.
-All users can edit their own profile to update their first and last names and e-mail addresses. Administrative users can also edit these fields if necessary. 
-All issues and work items are timestamped for creation and update.
-All data is stored encrypted with CryptoJS
-Passwords are encrypted and verified with Bcrypt
-Users are authenticated and allowed permissioned access using JSONWebToken
-Simple, professsional styling using Milligram.css

# UNSOLVED PROBLEMS


# WIREFRAMES


# USER STORIES


# ACKNOWLEDGEMENTS
