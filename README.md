# sfdx-bamboo-org
 This Repo has been modified from Official repo- `git clone https://github.com/<git_username>/sfdx-bamboo-org.git`. 
 This repo has been updated regards to windows bamboo server with further details. 


## Installing SFDX CLI on windows bamboo server
1) [Fork]this repo to your GitHub account using the fork link at the top of the page.

2) Clone your forked repo locally.

3) Get the tar files from URL mentioned at manifest at installation page and extract to the folder.

4) While running bamboo, need to set up path and install node modules by running npm install, you can copy over node modules but its better to install them. git ignore file has entries for node_modules.

5) Set up a JWT-based auth flow for the target orgs that you want to deploy to. This step creates a `server.key` file that is used in subsequent steps.
(https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_jwt_flow.htm)  

6) Confirm that you can perform a JWT-based auth to the target orgs: `sfdx force:auth:jwt:grant --clientid <your_consumer_key> --jwtkeyfile server.key --username <your_username>`

   **Note:** For more info on setting up JWT-based auth, see [Authorize an Org Using the JWT-Based Flow](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_jwt_flow.htm) in the [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev).

7) From your JWT-based connected app on Salesforce, retrieve the generated `Consumer Key`.

8) Set up Bamboo [plan variables](https://confluence.atlassian.com/bamboo/defining-plan-variables-289276859.html) for your Salesforce `Consumer Key` and `Username`. Note that this username is the username that you use to access your Salesforce org.

    Create a plan variable named `SF_CONSUMER_KEY`.

    Create a plan variable named `SF_USERNAME`.

9) Encrypt the generated `server.key` file and add the encrypted file (`server.key.enc`) to the folder named `assets`.

    `openssl aes-256-cbc -salt -e -in server.key -out server.key.enc -k password`

10) Set up Bamboo [plan variable](https://confluence.atlassian.com/bamboo/defining-plan-variables-289276859.html) for the password you used to encrypt your `server.key` file.

    Create a plan variable named `SERVER_KEY_PASSWORD`.

11) Create a Bamboo plan with the build file for your operating system (`build.bat` for Windows and `build.sh` for all others). The build files are included in the root directory of the Git repository.

Now you're ready to go! When you commit and push a change, your change kicks off a Bamboo build.

Enjoy!

