# NodeBB OpenID Steam

NodeBB Plugin that allows users to login/register via their Steam account.

## Installation

    npm install nodebb-plugin-openid-steam

## Configuration

After install, access NodeBB Admin Panel and Active the plugin. You may need to restart NodeBB in order for these changes to be reflected.

After restart, you will find the configurration page under **Social Authentication** menu. You will have to set your [**Steam API Key**][http://steamcommunity.com/dev/apikey]. After that, restart NodeBB again and a **check icon\*** will be available in Login/Registration page.

\* FontAwesome, used by Bootstrap and NodeBB, doesn't have the Steam Icon in their set. Maybe you can post on [this issue][https://github.com/FortAwesome/Font-Awesome/issues/1035] requesting the icon! :)