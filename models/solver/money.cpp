/*
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
*/

#include <gecode/int.hh>
#include <gecode/search.hh>

using namespace Gecode;

class SPLegalizer : public Space {
protected:
  IntVarArray l;
/* 
{
  “bonos”: [3, 6, 2],
  “facturas”: [5, 1, 7, 3]
}*/
public:
  SPLegalizer(void) : l(*this, 7, 0, 1) {
    IntVar s(l[0]), e(l[1]), n(l[2]), 
           d(l[3]), m(l[4]), o(l[5]), r(l[6]);


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
  // constrain function
  virtual void constrain(const Space& _b) {
    const SPLegalizer& b = static_cast<const SPLegalizer&>(_b);
    IntVar s(l[0]), e(l[1]), n(l[2]), 
           d(l[3]), m(l[4]), o(l[5]), r(l[6]);
    IntVar b_s(b.l[0]), b_e(b.l[1]), b_n(b.l[2]), 
           b_d(b.l[3]), b_m(b.l[4]), b_o(b.l[5]), b_r(b.l[6]);

    int money = (b_s.val() + b_e.val() + b_n.val() +
                 b_d.val() + b_m.val() + b_o.val() + b_r.val());

    IntArgs c(7); IntVarArgs x(7);

    c[0]=1; c[1]=1; c[2]=1; c[3]=1; c[4]=1; c[5]=1; c[6]=1;
    x[0]=s; x[1]=e; x[2]=n; x[3]=d; x[4]=m; x[5]=o; x[6]=r;
    linear(*this, c, x, IRT_GR, money);
  }
};

// main function
int main(int argc, char* argv[]) {
  SPLegalizer* m = new SPLegalizer;
  BAB<SPLegalizer> e(m);
  delete m;
  while (SPLegalizer* s = e.next()) {
    s->print(); delete s;
  }
  return 0;
}