# the compiler: gcc for C program, define as g++ for C++
CC = g++
# compiler flags:
#  -g    adds debugging information to the executable file
#  -Wall turns on most, but not all, compiler warnings
STDFLAG = -std=gnu++11
INCLUDEFLAG = -I/usr/local/include
CFLAGS  = -g -Wall -pthread -lpthread

# the build target executable:
TARGET = models/solver/
clean:
	$(RM) client
	$(RM) server
compile:
	$(CC) $(STDFLAG) $(INCLUDEFLAG) -c $(TARGET)money.cpp
