cmd_Release/obj.target/example.node := g++ -shared -pthread -rdynamic -m32  -Wl,-soname=example.node -o Release/obj.target/example.node -Wl,--start-group Release/obj.target/example/example.o Release/obj.target/example/example_wrap.o -Wl,--end-group 
