function setup() {
  createCanvas(windowWidth, windowHeight);
  theta=0.0;
  points=[];
  svg=apple_svg
  // scalefactor=2000/windowWidth;
  // if(scalefactor>1.5)
  // {
  // scalevalue=scalefactor;
  // }
  // else {
  //   scalevalue=1;
  // }
  // if(svg.length>1500){
  //   svg1=[];
  //   for(k=0;k<svg.length;k+=2)
  //   {
  //     svg1.push(svg[k]);
  //   }
  //   svg=svg1;
  // }
  // for(i=0;i<svg.length;i++)
  // {
  //   const pt=new Complex(svg[i][0]/scalevalue,svg[i][1]/scalevalue);
  //   points.push(pt);
  // }
  // fourier=dft(points);
  // xpbuffer=[];
  // ypbuffer=[];
  setup_refresh();

  sel = createSelect();
  sel.position(10, 10);
  sel.option('apple');
  sel.option('car');
  sel.option('aditya');
  sel.option('rocket');
  sel.option('youtube');
  sel.option('bjp');
  sel.option('nasa');
  sel.changed(mySelectEvent);
}

function setup_refresh()
{
  points=[];
  scalefactor=2000/windowWidth;
  if(scalefactor>1.5)
  {
  scalevalue=scalefactor;
  }
  else {
    scalevalue=1;
  }
  if(svg.length>1500){
    svg1=[];
    for(k=0;k<svg.length;k+=2)
    {
      svg1.push(svg[k]);
    }
    svg=svg1;
  }
  for(i=0;i<svg.length;i++)
  {
    const pt=new Complex(svg[i][0]/scalevalue,svg[i][1]/scalevalue);
    points.push(pt);
  }
  fourier=dft(points);
  xpbuffer=[];
  ypbuffer=[];
  theta=0;
}

function mySelectEvent()
{
  points=[];
  let item=sel.value();
  if(item=='apple')
  {
    svg=apple_svg;
  }
  if(item=='car')
  {
    svg=car_svg;
  }
  if(item=='aditya')
  {
    svg=aditya_svg;
  }
  if(item=='rocket')
  {
    svg=rocket_svg;
  }
  if(item=='youtube')
  {
    svg=yt_svg;
  }
  if(item=='bjp')
  {
    svg=bjp_svg;
  }
  if(item=='nasa')
  {
    svg=nasa_svg;
  }
  // scalefactor=2000/windowWidth;
  // if(scalefactor>1.5)
  // {
  // scalevalue=scalefactor;
  // }
  // else {
  //   scalevalue=1;
  // }
  // if(svg.length>1500){
  //   svg1=[];
  //   for(k=0;k<svg.length;k+=2)
  //   {
  //     svg1.push(svg[k]);
  //   }
  //   svg=svg1;
  // }
  // for(i=0;i<svg.length;i++)
  // {
  //   const pt=new Complex(svg[i][0]/scalevalue,svg[i][1]/scalevalue);
  //   points.push(pt);
  // }
  // fourier=dft(points);
  // theta=0.0;
  // xpbuffer=[];
  // ypbuffer=[];
  setup_refresh();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // theta=0.0;
  // xpbuffer=[];
  // ypbuffer=[];
  setup_refresh();
}

function show_buffer()
{
  stroke(color('#14BDEB'));
  strokeWeight(2);
  noFill();
  beginShape();
  for(i=0;i<xpbuffer.length;i++)
  {
    curveVertex(xpbuffer[i],ypbuffer[i]);
  }
  endShape();
}

function draw_conc(x,y,dft,rot)
{
  xold=x;
  yold=y;
  for(i=1;i<dft.length;i++)
  {
    xnew=xold+(dft[i].amp*cos(rot+dft[i].phase+dft[i].freq*theta+HALF_PI));
    ynew=yold+(dft[i].amp*sin(rot+dft[i].phase+dft[i].freq*theta+HALF_PI));
    stroke(color('#EF476F'));
    strokeWeight(0.5);
    ellipse(xold,yold,dft[i].amp*2);
    stroke(color('#DD614A'));
    strokeWeight(5);
    point(xnew,ynew);
    stroke(color('#EDD382'));
    strokeWeight(1);
    line(xold,yold,xnew,ynew);
    xold=xnew;
    yold=ynew;
  }
  return createVector(xnew,ynew);
}

function draw() {
  clear();
  background(color('#030027'));
  e1vec=draw_conc(width/2,height/2,fourier,-HALF_PI);
  xpbuffer.unshift(e1vec.x);
  ypbuffer.unshift(e1vec.y);
  show_buffer();
  theta=theta+TWO_PI/(fourier.length);
  if(theta>2*TWO_PI)
  {
    theta=0.0;
    xpbuffer=[];
    ypbuffer=[];
  }
}
