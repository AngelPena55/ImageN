# ImageN
An image editor with drawing capabilities. The app also includes photo editing features such as resize a given photo,addfilters 
such as fade,special effects,crop the photo,rotate the photo clockwise and anticlockwise , add text to the photo, change hue and saturation of the photo etc.

# Contributers
Gustavo Flores

Kenneth Woo

Josue Flores

Sai Pappu

Angel Pena

Kevin Mundo

Josue Reyes

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

**Deployment**

Used Glitch to deploy the website.

Click [here](https://paint-editor2020.glitch.me/) to visit it or search https://paint-editor2020.glitch.me/

# Features 

Crop an Image.

Flip an Image Vertically or Flip Horizontally.

Rotate an Image.

Adjust the Saturation of an Image.

Adjust the Opacity of an Image.

Change Between Pen Tips (Round, Square, Butt).

Change Between Pen Colors (Black, White, Blue, Red, Green, Yellow, Purple).

Eraser for Removing Mistakes.

# Photo Filters

Grayscale Filter

Bright Filter

Dark Filter

Blur

Emboss

Sharp


# Aglorithms 

## Gaussian Blur

Bluring is a very common image manipulation feature found in most image editing softwares. A gaussian Blur basically uses a gaussian function to apply some transformation to an individual pixel. This can be used in pre-processing as well as for other post processing usecases. 
This the formula for a 2D Gaussian Function for the blur

![Screen Shot 2020-11-05 at 9 17 22 PM](https://user-images.githubusercontent.com/20531977/98329643-8bc9e600-1fad-11eb-8211-a97c185dcbf0.png)
)

It is also possible to control the smoothness of the pixel as well as other gradient values by manipulation the Standard Deviation of the Gaussian Filter. The formula for this is given below. 

![Screen Shot 2020-11-05 at 9 31 20 PM](https://user-images.githubusercontent.com/20531977/98329970-40fc9e00-1fae-11eb-8ed3-79f6bd34da7b.png)


This is an example of how gaussian blur in action

![Screen Shot 2020-11-05 at 9 32 11 PM](https://user-images.githubusercontent.com/20531977/98330018-5ffb3000-1fae-11eb-9891-e58634049b4b.png)

## Saturation
Saturation is the intensity or depth of colors found within an image. The more saturated an image is, the more vibrant each color of the image appears and the less saturated an image is the more muted and gray each color becomes, similarly to a grayscale effect. Due to this, saturation algorithms often depend on determining and altering the luminance or brightness of the RGB found within an image. One of the most common ways to determine the luminance is to multiply the red, green, and blue data of an image by the constants of 0.3086, 0.6094, 0.0820, respectively. To make the calculations simpler, the matrix below that holds the data of the image is used. 
                                                
                                                |a b c 0 0|
                                                |d e f 0 0|
                                                |g h i 0 0|
                                                
Each cell of this matrix is calculated as shown below where satLevel is the level of saturation that the user defines between 0 to 3, where 0 makes a grayscale-like effect, 1 makes no effect and anything greater than one multiplies the saturation effect:

                                               a = (1.0 - satLevel) * redLuminanceConst + satLevel
                                               b = (1.0 - satLevel) * redLuminanceConst;
                                               c = (1.0 - satLevel) * redLuminanceConst;
                                               d = (1.0 - satLevel) * greenLuminanceConst;
                                               e = (1.0 - satLevel) * greenLuminanceConst + satLevel;
                                               f = (1.0 - satLevel) * greenLuminanceConst;
                                               g = (1.0 - satLevel) * blueLumluminanceConst;
                                               h = (1.0 - satLevel) * blueLuminanceConst;
                                               i = (1.0 - satLevel) * blueLumimanceConst + satLevel;

After these values are calculated, multiply them by the data matrix of the image to the respective position of the matrix from earlier in order to apply the effect to the image.

## Grayscale

Grayscale is a range of gray shades from white to black, as used in a monochrome display or printout. Grayscale images are most commonly used in image processing because smaller data enables developers to do more complex operations in a shorter time. There are two main ways to achieve the grayscale effect. 

**Average Method**

The Average method takes the average value of R, G, and B as the grayscale value.
The formula is as follows 

`Grayscale = R / 3 + G / 3 + B / 3.`

The average method is simple but doesn’t work as well as expected. The reason being that human eyeballs react differently to RGB. Eyes are most sensitive to green light, less sensitive to red light, and the least sensitive to blue light. Therefore, the three colors should have different weights in the distribution

**Weighted Method**

The weighted method, also called luminosity method, weighs red, green and blue according to their wavelengths

`Grayscale  = 0.299R + 0.587G + 0.114B`


