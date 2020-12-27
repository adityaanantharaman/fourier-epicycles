# fourier-epicycles
drawing shapes using discrete fourier transform and epicycles

## working on enabling user submitted svgs
but for now, you can clone this repo and add your own svgs to the points.js file.
## how to add your own svg?
1. create your own svg / convert images to svg using some online tool. ( <https://image.online-convert.com/convert-to-svg> )
2. convert svg path to coordinates ( I used <https://spotify.github.io/coordinator/> ). 800 points are optimal. anything above 1500 gets halved.
3. paste the json coordinates in one of the variables in points.js
4. open index.html and view

one problem I faced was that the SVGs were divided and that caused cuts/connections across different parts of the image. this can be avoided by tracing your own single path svg using some editing tool like inkscape.

ping me if you have any suggestions/ideas to implement.

<https://twitter.com/ady_anr_>

<ananthram.aditya@gmail.com>
