# ImageN
An image editor with drawing capabilities. The app also includes photo editing features such as resize a given photo,addfilters 
such as fade,special effects,crop the photo,rotate the photo clockwise and anticlockwise , add text to the photo, change hue and saturation of the photo etc.


# Installation Guide

If the user wants to run the program in his/her local system.

**Step 1:** Have NodeJs installed to your system. 
This [guide](https://www.edureka.co/blog/node-js-installation/) will help.

**Step 2:** Clone the git repository
`git clone https://github.com/HeroofLight555/ImageN.git`

**Step 3:** Go to the ImageN folder

**Step 4:** To run the program type in the terminal 
`node script.js`

# Stack 
**Front End**

Since this application is static we used 

 - HTML (Document Structure)
 - CSS  (Styling the webpage)
 
**Backend**

- NodeJs (JS runtime environment)
- Vanilla Javascript (Programming Language)

# Aglorithms 

## Gaussian Blur

Bluring is a very common image manipulation feature found in most image editing softwares. A gaussian Blur basically uses a gaussian function to apply some transformation to an individual pixel. This can be used in pre-processing as wel as for other post processing usecases. 
This the formula for a 2D Gaussian Function for the blur

![Screen Shot 2020-11-05 at 9 17 22 PM](https://user-images.githubusercontent.com/20531977/98329643-8bc9e600-1fad-11eb-8211-a97c185dcbf0.png)
)

It is also possible to control the smoothness of the pixel as well as other gradient values by manipulation the Standard Deviation of the Gaussian Filter. The formula for this is given below. 

![Screen Shot 2020-11-05 at 9 31 20 PM](https://user-images.githubusercontent.com/20531977/98329970-40fc9e00-1fae-11eb-8ed3-79f6bd34da7b.png)


This is an example of how gaussian blur in action

![Screen Shot 2020-11-05 at 9 32 11 PM](https://user-images.githubusercontent.com/20531977/98330018-5ffb3000-1fae-11eb-9891-e58634049b4b.png)

## Saturation


## Grayscale

Grayscale is a range of gray shades from white to black, as used in a monochrome display or printout. Grayscale images are most commonly used in image processing because smaller data enables developers to do more complex operations in a shorter time. There are two main ways to achieve the blur effect. 

**Average Method**

The Average method takes the average value of R, G, and B as the grayscale value.
The formula is as follows 

`Grayscale = R / 3 + G / 3 + B / 3.`

The average method is simple but doesn’t work as well as expected. The reason being that human eyeballs react differently to RGB. Eyes are most sensitive to green light, less sensitive to red light, and the least sensitive to blue light. Therefore, the three colors should have different weights in the distribution

**Weighted Method**

The weighted method, also called luminosity method, weighs red, green and blue according to their wavelengths

`Grayscale  = 0.299R + 0.587G + 0.114B`

# Usage Examples


# Contributers
Gustavo Flores

Kenneth Woo

Josue Flores

Sai Pappu

Angel Pena


