# UploadAPINode

One API to test the Nodejs, express and express-fileupload for perform a upload images in single or multi mode.

## how do i use this?

- Install dependencies described in package.json
 > npm i
- Run the server
 > node server.js

- After up server, you may call the local url to test, using the html form

 > http://localhost:8000/form

- The upload API use the POST method and the following parameters:

  - formKey, to represents the identifier to one pack of images from one specific form;
  - img+{i}, to represents the references of each image of the pack, where the i is an integer number sequence starting on 1 so the images are img1, img2, img3...

 > http://localhost:8000/upload (POST)