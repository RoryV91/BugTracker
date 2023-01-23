# MAJOR
A simple bug tracker to identify **Major** malfunctions and keep track of issues.

# APPROACH
I wanted to demonstrate some of the skills I acquired at General Assembly to build something that I believe would be useful for general business purposes. I set out to build a no-frills bug tracker that would allow end-users to post issues for a support team to address and the whole thing would be managed by one or more administrators. I wanted to experiment with permissions and conditional rendering by the use of authentication. Essentially I wanted to push myself to build something with what I felt like was real functionality, beyond basic-CRUD apps.

# TECHNOLOGIES
This project utilizes the MERN stack; or MongoDB, Express, React.js, and Node.js. This also uses axios to make API calls to the backend. 

Additionally I employed the following technologies to develop this web application:

-Bcrypt 
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
I did not have time to implement CryptoJS, I will do so in a later build to showcase that ability. I did not have time to implement the refresh tokens or create real error handling. Most of this is happy path, but it should be difficult to veer from that.

# WIREFRAMES
Wireframes can be found in the 'Planning' folder of the project.

# USER STORIES
"As a manager of a local insurance agency, this is a great tool to report and track issues for our proprietary software. It has a no-frills, easy-to-use interface for someone who is not familiar with tech or computers like me. I post the issue, and support is notified some how and fixes it; I can even see updates as they happen."

"As a support tech for an unnamed insurance company, this tool makes it easy for me to keep track of tickets assigned to me. I am notified in the portal of any new tickets assigned to me and I can mark them as received, in progress, in review, or closed. I can add steps taken or reasoning for changing status, such as closing a duplicate ticket. This is pretty impressive knowing that a single developer made this all on their own."

"As a support admin, I don't have to do too much here because of the easy user interface. Even less knowledgeable employees don't make mistakes because it's hard to mess up a issue submission. If they do, I can correct problems with ease. Really, all I have to do is change an employee's status from basic user to support if they are transferred to that team, or vice versa."

# ACKNOWLEDGEMENTS
Many thanks to the many developers at StackOverflow who have ran into the many errors that I encountered during development, and posted questions and an **even greater** thanks to the many developers who answered those questions in a succinct manner.
