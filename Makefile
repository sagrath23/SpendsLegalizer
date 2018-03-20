# the compiler: gcc for C program, define as g++ for C++
CC = g++
# compiler flags:
#  -g    adds debugging information to the executable file
#  -Wall turns on most, but not all, compiler warnings
STDFLAG = -std=gnu++11
INCLUDEFLAG = -I/usr/local/include
LIBPATH = -L/usr/local/lib
LIBDEP = -lgecodesearch -lgecodeint -lgecodekernel -lgecodesupport -lgecodegist
CFLAGS  = -g -Wall -pthread -lpthread

# the build target executable:
TARGET = models/solver/
clean:
	$(RM) client
	$(RM) server
compile:
	$(CC) $(STDFLAG) $(INCLUDEFLAG) -c $(TARGET)money.cpp
build: 
	$(CC) -o money $(LIBPATH) $(TARGET)money.o $(LIBDEP)
	g++ -o money -L/usr/local/lib money.o -lgecodesearch -lgecodeint -lgecodekernel -lgecodesupport -lgecodegist
