# Alpacamundo

Angular application for Alpacamundo.eu

## Building

Development/Local build:
ng build --configuration=development

Test build:
ng build --configuration=test

Production build:
ng build --configuration=production

## How To deploy manually
Need:
- docker extension vsCode to easy build en push images.
- registry connected to docker extension to push image to.
- some place to deploy the image to.

1. build the corresponding build
2. start docker desktop
3. build docker image
4. test docker image locally with docker desktop
5. push docker image to registry !with right tag!
6. ... restart container with new pulled image 


