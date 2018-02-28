npm rebuild leveldown scrypt;
echo "Starting Testrpc..."
./node_modules/ethereumjs-testrpc/bin/testrpc --port 8545 
testrpc_pid=$!
sleep 5;
karma start config.karma.js
echo "Shutting down TestRpc..."
kill -9 $testrpc_pid

