# swiss-pritesh
Swiss tournament application governed through Express, Node and MySQL.

This application provides a user interface to create and conduct multiple Swiss tournaments.
The following are the use-cases encompassing the project:

* USER: Signup and login, Facebook login supported
* USER: Create tournament
* USER: View all tournaments
* USER: Add new or existing players to the tournament, only if the tournament hasn't started
* USER: Run multiple tournaments
* USER: Ensure 2^n number of players before starting the tournament
* USER: Conduct rounds in a tournament
* USER: Get fixtures for upcoming rounds
* USER: Report matches in a round i.e. Declare winners and losers for a particular round
* USER: Get player standings across tournaments
* ADMIN: View all users
* ADMIN: See most active users
* ADMIN: Block users from conducting tournaments

# Installation and runtime guide:

** Node, MongoDB and MySQL installation and configuration are pre-requisites for this application!

1. Hit the clone or download button to get the link of the repository.
2. Go to command-line and type 'git clone <paste the link copied in step 1>' and hit enter.
3. Navigate to the cloned repository through command-line, and run 'npm install' to get all the required node-modules.
4. Go to swiss-pritesh/app/models and execute the 'swiss-script.sql' in order to make the back-end ready.
5. Inside the root folder, type 'node server' and hit enter in the command-line.
4. Open your browser and type 'localhost:8000'.
5. Cheers!
