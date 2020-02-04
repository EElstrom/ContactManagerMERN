#!/bin/bash

# update node packages
(cd /var/www/ContactManagerApp/; npm install) > /dev/null 2> /dev/null
(cd /var/www/ContactManagerApp/frontend/; npm install) > /dev/null 2> /dev/null

# build react
(cd /var/www/ContactManagerApp/frontend/; npm run build) > /dev/null 2> /dev/null

# restart express server
su ubuntu -c 'sudo pm2 restart server' > /dev/null 2> /dev/null
