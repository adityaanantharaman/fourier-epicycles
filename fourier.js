//https://danmarshall.github.io/google-font-to-svg-path/
//COORDINATOR
//
class Complex
{
  constructor(a,b)
  {
    this.re=a;
    this.im=b;
  }
  multiply(c)
  {
    const real=this.re*c.re-this.im*c.im;
    const imaginary=this.re*c.im+this.im*c.re;
    return new Complex(real,imaginary);
  }
  add(c)
  {
    this.re+=c.re;
    this.im+=c.im;
  }
}
function dft(x)
{
  X=[];
  const N=x.length;
  for(let k=0;k<N;k++)
  {
    const comp=new Complex(0,0);
    for(let n=0;n<N;n++)
    {
      const angle=(TWO_PI*k*n)/N;
      c=new Complex(cos(angle),-sin(angle));
      comp.add(x[n].multiply(c));
    }
    comp.re=comp.re/N;
    comp.im=comp.im/N;
    let freq=k;
    let amp=sqrt(comp.re*comp.re+comp.im*comp.im);
    let phase=atan2(comp.im,comp.re);
    X[k]={freq,amp,phase};
  }
  X=X.sort((a,b) => (a.amp < b.amp) ? 1 : ((b.amp < a.amp) ? -1 : 0));
  return X;
}
