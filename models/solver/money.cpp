/*
 *  Authors:
 *    Christian Schulte <schulte@gecode.org>
 *
 *  Copyright:
 *    Christian Schulte, 2008-2018
 *
 *  Permission is hereby granted, free of charge, to any person obtaining
 *  a copy of this software, to deal in the software without restriction,
 *  including without limitation the rights to use, copy, modify, merge,
 *  publish, distribute, sublicense, and/or sell copies of the software,
 *  and to permit persons to whom the software is furnished to do so, subject
 *  to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

#include <gecode/int.hh>
#include <gecode/gist.hh>

// steps to compile
// add to path: export LD_LIBRARY_PATH=/lib:/usr/lib:/usr/local/lib
// compile: g++ -std=gnu++11 -I/usr/local/include -c money.cpp 
// link: g++ -o money -L/usr/local/lib money.o -lgecodesearch -lgecodeint -lgecodekernel -lgecodesupport -lgecodegist


using namespace Gecode;

class SPLegalizer : public Space {
protected:
  IntVarArray l;
public:
  SPLegalizer(void) : l(*this, 7, 0, 1) {
    IntVar s(l[0]), e(l[1]), n(l[2]), 
           d(l[3]), m(l[4]), o(l[5]), r(l[6]);
/* 
{
  “bonos”: [3, 6, 2],
  “facturas”: [5, 1, 7, 3]
}
*/
    IntArgs c(7); IntVarArgs x(7);
    c[0]=3; c[1]=6; c[2]=2; 
    x[0]=s; x[1]=e; x[2]=n; 
    
    c[3]=-5; c[4]=-1; c[5]=-7; c[6]=-3;
    x[3]=d;  x[4]=m;  x[5]=o;  x[6]=r;
    
    linear(*this, c, x, IRT_EQ, 0);
    branch(*this, l, INT_VAR_SIZE_MIN(), INT_VAL_MIN());
  }
  SPLegalizer(SPLegalizer& s) : Space(s) {
    l.update(*this, s.l);
  }
  virtual Space* copy(void) {
    return new SPLegalizer(*this);
  }
  void print(void) const {
    std::cout << l << std::endl;
  }
};

int main(int argc, char* argv[]) {
  SPLegalizer* m = new SPLegalizer;
  Gist::dfs(m);
  delete m;
  return 0;
}