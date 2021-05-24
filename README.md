# Thunderham

Thunderham is the companion Add-on for Mozilla Thunderbird 78+ to our security analytics project.
The goal of our project was to be able to detect whether emails are spam or ham (not spam) using a machine learning model.
While there is a web interface to upload emails and check them, this Add-on simplifies the analysis for Mozilla Thunderbird.

Please note that the web interface is still needed. This Add-on should just help checking your mails so that a manual export of the mails as `.eml`-files is not needed because the mail gets automatically transferred. Also, please keep in mind that selecting multiple emails is not supported.

## Usage
Emails can be checked via the message list or the mail view.

### Message list
1. Select the email to check from the message list via right-click (context menu)
2. Click on "Check with Thunderham"
3. Wait for the result (an OS notification will spawn)

### Mail view
1. Open a message
2. Click on the "Thunderham" icon / text next to the buttons like "answer"
3. Wait for the result (text under the icon will appear)

## Installation
The Add-on has been tested with `Mozilla Thunderbird 78.10.2`.
1. Start Thunderbird and click on the hamburger menu (3 horizontal lines)
2. Click on "Add-ons"
3. Click on the gear symbol
4. Select install Add-on from file
5. Choose the thunderham.xpi
6. Configure the Add-on
	1. Go to / stay at the Add-on page
	2. Click on the wrench symbol
	3. Enter the URL of your server (no trailing slash, root page, e.g. `https://example.com` or `https://example.com:5000`)
