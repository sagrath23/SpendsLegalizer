#include <gecode/driver.hh>
#include <gecode/int.hh>
#include <gecode/search.hh>
#include <gecode/gist.hh>

using namespace Gecode;

class SPLegalizer : public Space {
protected:
  IntVarArray l;
  int definedVariables;

public:
  SPLegalizer(int countTickets, int countBills, int ticketsValues[] , int billsValues[] ) : l(*this, countTickets + countBills, 0, 1) {

    this->definedVariables = countTickets + countBills;
    
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
  /*
    const SPLegalizer& branch = static_cast<const SPLegalizer&>(_spaceBranch);

    IntVar variables [this->definedVariables] = {};
    IntVar branchVariables [this->definedVariables] = {};

    //setup variables & branch variables
    for (int i = 0; i < this->definedVariables; i++) {
      IntVar var(l[i]);
      IntVar branch_var(branch.l[i]);
      variables[i] =  var;
      branchVariables[i] = branch_var;
    }

    //TODO: delete this
    IntVar s(l[0]), e(l[1]), n(l[2]), 
           d(l[3]), m(l[4]), o(l[5]), r(l[6]);
    //TODO: and this
    IntVar b_s(branch.l[0]), b_e(branch.l[1]), b_n(branch.l[2]), 
           b_d(branch.l[3]), b_m(branch.l[4]), b_o(branch.l[5]), b_r(branch.l[6]);

    int newMoney = 0;

    //
    for (int i = 0; i < this->definedVariables; i++) {
      int value = branchVariables[i].val();
      newMoney = newMoney + branchVariables[i].val();
    }

    //TODO: delete this
    int money = (b_s.val() + b_e.val() + b_n.val() +
                 b_d.val() + b_m.val() + b_o.val() + b_r.val());

    IntArgs c(7); IntVarArgs x(7);

    c[0]=1; c[1]=1; c[2]=1; c[3]=1; c[4]=1; c[5]=1; c[6]=1;
    x[0]=s; x[1]=e; x[2]=n; x[3]=d; x[4]=m; x[5]=o; x[6]=r;

    linear(*this, c, x, IRT_GR, money);
  */
    const SPLegalizer& branch = static_cast<const SPLegalizer&>(_spaceBranch);

    //TODO: delete this
    IntVar s(l[0]), e(l[1]), n(l[2]), 
           d(l[3]), m(l[4]), o(l[5]), r(l[6]);
    //TODO: and this
    IntVar b_s(branch.l[0]), b_e(branch.l[1]), b_n(branch.l[2]), 
           b_d(branch.l[3]), b_m(branch.l[4]), b_o(branch.l[5]), b_r(branch.l[6]);

    //TODO: delete this
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

  if (argc < 3) {
    std::cerr << "Syntax : ./money --mode < 0 => console, 1 => GIST> --tickets <countOfTickets> --ticketList <list_of_tickets> --bills <countOfTickets> --billList <list_of_bills>" << std::endl;
    return 0;
  }

  int ticketsValues [atoi(argv[4])] = { 3, 6, 2 }; 
  int billsValues [atoi(argv[8])] = {5, 1, 7, 3};

  SPLegalizer* m = new SPLegalizer(atoi(argv[4]), atoi(argv[8]), ticketsValues, billsValues);

  std::cout << argv[4] << std::endl; //count tickets
  std::cout << argv[6] << std::endl; //list tickets
  std::cout << argv[8] << std::endl; //count bills
  std::cout << argv[10] << std::endl; //list bills
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