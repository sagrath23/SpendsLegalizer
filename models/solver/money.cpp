/* 
#include <gecode/driver.hh>
#include <gecode/int.hh>
#include <gecode/search.hh>
#include <gecode/gist.hh>
*/
#include "gecode/gecode/driver.hh"
#include "gecode/gecode/int.hh"
#include "gecode/gecode/search.hh"
#include "gecode/gecode/gist.hh"

using namespace Gecode;

// steps to compile
// add to path: export LD_LIBRARY_PATH=/lib:/usr/lib:/usr/local/lib
// compile: g++ -std=gnu++11 -I/usr/local/include -c money.cpp 
// link: g++ -o money -L/usr/local/lib money.o -lgecodesearch -lgecodeint -lgecodekernel -lgecodesupport -lgecodegist

class SPLegalizer : public Space {
protected:
  IntVarArray l;
  int definedVariables;
  IntVar defVar;

public:
  //default constructor
  SPLegalizer(int countTickets, int countBills, int ticketsValues[] , int billsValues[] ) : l(*this, countTickets + countBills, 0, 1), defVar(*this, countTickets + countBills, countTickets + countBills) {

    this->definedVariables = defVar.val();

    IntVar variables [this->definedVariables] = {};

    for (int i = 0; i < this->definedVariables; i++) {
      IntVar var(l[i]);
      variables[i] =  var;
    }

    IntArgs c(this->definedVariables); 
    IntArgs v(this->definedVariables); 
    IntVarArgs x(this->definedVariables);

    //setup tickets expressions
    for (int i = 0; i < countTickets; i++) {
      c[i] = ticketsValues[i];
      x[i] = variables[i];
      v[i] = 1;
    }

    //setup bills expressions
    for (int i = 0; i < countBills; i++) {
      c[countTickets + i] = -1 * billsValues[i];
      x[countTickets + i] = variables[countTickets + i];
      v[countTickets + i] = 1;
    }
    
    //the sum of tickets & bills must be greater or equal than zero
    linear(*this, c, x, IRT_GQ, 0);
    //must be legalized at least one bill & one ticket
    linear(*this, v, x, IRT_GQ, 2);

    branch(*this, l, INT_VAR_SIZE_MIN(), INT_VAL_MIN());
  }

  // Copy Constructor
  SPLegalizer(SPLegalizer& s) : Space(s) {
    l.update(*this, s.l);
    defVar.update(*this, s.defVar);
  }

  virtual Space* copy(void) {
    return new SPLegalizer(*this);
  }

  void print(void) const {
    std::cout << l << std::endl;
  }

  void print(std::ostream& os) const {
    os << l << std::endl;
  }

  // constrain function
  virtual void constrain(const Space& _spaceBranch) {
    const SPLegalizer& branch = static_cast<const SPLegalizer&>(_spaceBranch);

    int countVariables = branch.defVar.val();

    IntVar variables [countVariables] = {};
    IntVar branchVariables [countVariables] = {};

    //setup variables & branch variables
    for (int i = 0; i < countVariables; i++) {
      IntVar var(l[i]);
      IntVar branch_var(branch.l[i]);
      variables[i] =  var;
      branchVariables[i] = branch_var;
    }

    int legalizedDocuments = 0;

    for (int i = 0; i < countVariables; i++) {
      legalizedDocuments = legalizedDocuments + branchVariables[i].val();
    }

    IntArgs c(countVariables); IntVarArgs x(countVariables);

    for (int i = 0; i < countVariables; i++) {
      c[i] = 1;
      x[i] = variables[i];
    }

    linear(*this, c, x, IRT_GR, legalizedDocuments);
  }
};

// main function
int main(int argc, char* argv[]) {

  if (argc < 11) {
    std::cerr << "Syntax : ./money --mode < 0 => console, 1 => GIST> --tickets <countOfTickets> --ticketList <list_of_tickets> --bills <countOfTickets> --billList <list_of_bills>" << std::endl;
    return 0;
  }
  int countTickets = atoi(argv[4]);
  int countBills = atoi(argv[8]);

  int ticketsValues [countTickets] = {}; //{ 3, 6, 2 }; 
  int billsValues [countBills] = {};//{5, 1, 7, 3};
  char* pch;

  //parsing tickets
  pch = strtok (argv[6]," ,.-");
  int i = 0;
  while (pch != NULL) {
    ticketsValues[i] = atoi(pch);
    i++;
    pch = strtok (NULL, " ,.-");
  }

  //parsing bills
  pch = strtok (argv[10]," ,.-");
  i = 0;
  while (pch != NULL) {
    billsValues[i] = atoi(pch);
    i++;
    pch = strtok (NULL, " ,.-");
  }

  SPLegalizer* m = new SPLegalizer(countTickets, countBills, ticketsValues, billsValues);

  switch(atoi(argv[2])) {
    case 1: {// GIST
      Gist::Print<SPLegalizer> p("Print solution");
      Gist::Options o;
      o.inspect.click(&p);
      Gist::bab(m,o);
      delete m;
    } break;
    case 0: { // CONSOLE
      BAB<SPLegalizer> e(m);
      delete m;
      while (SPLegalizer* s = e.next()) {
        s->print(); delete s;
      } 
    } break;
    default: {
      BAB<SPLegalizer> e(m);
      delete m;
      while (SPLegalizer* s = e.next()) {
        s->print(); delete s;
      } 
    }
  }
  return 0;
}