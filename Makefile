# the compiler: gcc for C program, define as g++ for C++
CC = g++
# compiler flags:
#  -g    adds debugging information to the executable file
#  -Wall turns on most, but not all, compiler warnings
STDFLAG = -std=gnu++11
INCLUDEFLAG = -I/usr/local/include
HEROKUINCLF = -Igecode/gecode
LIBPATH = -L/usr/local/lib
HEROKULIBPATH = -Lgecode
LIBDEP = -lgecodesearch -lgecodeint -lgecodekernel -lgecodesupport -lgecodegist
CFLAGS  = -g -Wall -pthread -lpthread

# the build target executable:
TARGET = models/solver/
HEROKUTARGET = /app/models/solver/
clean:
	$(RM) client
	$(RM) server
compile:
	$(CC) $(STDFLAG) $(INCLUDEFLAG) -c $(TARGET)money.cpp -o $(TARGET)money.o
build: 
	$(CC) -o $(TARGET)money $(LIBPATH) $(TARGET)money.o $(LIBDEP)
all-local: 
	$(CC) $(STDFLAG) $(INCLUDEFLAG) -c $(TARGET)money.cpp -o $(TARGET)money.o
	$(CC) -o $(TARGET)money $(LIBPATH) $(TARGET)money.o $(LIBDEP)
all-heroku:
	$(CC) $(STDFLAG) $(HEROKUINCLF) -c $(HEROKUTARGET)money.cpp -o $(TARGET)money.o
	$(CC) -o $(HEROKUTARGET)money $(LIBPATH) $(HEROKUTARGET)money.o $(LIBDEP)