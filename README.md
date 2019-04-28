<!-- PROJECT SHIELDS -->
[![Build Status][build-shield]]()
[![Contributors][contributors-shield]]()
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">eMotionaL</h3>

  <p align="center">
    Awarded most innovative project. Fourth year capstone project that can predict human emotion through vocal input using machine learning techniques (Keras & Tensorflow).
    <br />
    <a href="https://github.com/sheldoncoates/eMotionaL/issues">Report Bug</a>
   </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Contact](#contact)
* [Installation](#installation)


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://github.com/sheldoncoates/eMotionaL)

This project set out to determine the emotion of the user based on only vocal analysis. To do this a convolutional neural network was used to train a model that could predict emotions with ~%80 accuracy.

### Built With
Here is the tech used to create this project.
* [JavaScript](https://www.javascript.com/)
* [JQuery](https://jquery.com)
* [Python](https://www.python.org/)
* [Flask](http://flask.pocoo.org/)
* [Tensorflow](https://www.tensorflow.org/)
* [Keras](https://keras.io/)


<!-- CONTACT -->
## Contact

Sheldon Coates - [LinkedIn](https://www.linkedin.com/in/sheldoncoates/) - sjrcoates@gmail.com 


<!-- Installation -->
## Installation
1. Make sure you have python 3.7 installed on you computer. You can download it here at: [Python](https://www.python.org/)
2. Install virtualenv like in here: https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/ 
3. Once you have your virtual env installed, create a new virtual environment like in the link in step 2.
3. Once you have created your virtual environment, go into the virtuaenvironment and delelte the folders: bin, include and lib. 
4. Once you have removed those folders, cd to the directory which your virtual env is stored, for me it's in my root directory which is my name, and run the command: `virtualenv --python=/Library/Frameworks/Python.framework/Versions/3.7/bin/python3 ./emotional/` 
5. Next, run your virtual env like in the link in step 2.
6. Once in your virtual env, cd to the directory where eMotionaL was downloaded then cd into eMotionaL.
7.  Run: `pip install -r requirements.txt`. This will install all the required dependencies.
7. cd into the second eMotionaL folder in the project and then run: `python server.py`. This will host eMotionaL at: http://localhost:5000/ 




<!-- MARKDOWN LINKS & IMAGES -->
[build-shield]: https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square
[contributors-shield]: https://img.shields.io/badge/contributors-1-orange.svg?style=flat-square
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://choosealicense.com/licenses/mit
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/sheldoncoates/
[product-screenshot]: emotional.gif
