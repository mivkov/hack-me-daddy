# Inspiration
We’ve all heard the horror stories: one day, some Instagram influencer or musical artist posts a picture of themselves on social media. The next day, a deranged fan stalks them, and their encounter makes the headlines. Or maybe, more innocuously, you’ve seen one of your acquaintances accidentally give away some personally identifiable information in a photo or text, like their phone number or their address. The ubiquitous reach of social media makes security and privacy a precious commodity in the modern day. Our application, Social Scrubber, aims to help people filter potential identifying information out of their social media posts.

# What It Does
Our application, Social Scrubber, identifies which parts of a Facebook post may contain personally identifiable information (PII). Users install our application as a Chrome Extension which detects when the user is making a Facebook post. The application automatically identifies potential PII in the process of making the post, both in the text box as well as within the uploaded photos. When it identifies potential PII, it warns the user via a pop-up containing the offending information.

# How It Works
We used the Azure Content Moderation API for text that identifies if a particular piece of text contains personally identiable information (PII). We used Azure's OCR technology to find text and then scanned that text for more PII. The API is hosted on Azure Web Services as part of an Express.js webapp.   

### Installing the Chrome extension:

Visit chrome://extensions/, click the "Load Unpacked" button, and select the ```extensions``` folder when prompted.

### To use the Chrome extension:

When you go to Facebook and create a post, the extension will scan your post for possible personally identifiable information. If it finds something in either the text or the photos you upload, a warning will popup on the left corner on the screen letting you know what information you may be giving away. 

## Built With

- [Express.js](https://expressjs.com/)
- [Azure Cloud Web Services](https://azure.microsoft.com/en-us/services/cloud-services/)
- [Azure Content Moderation API](https://azure.microsoft.com/en-us/services/cognitive-services/content-moderator/)
- [Chrome Developer Tools](https://developer.chrome.com/extensions/devguide)

 
