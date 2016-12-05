


START "runas /user:administrator" cmd /K "e: & cd MongoDB\Server\3.2\bin & mongod.exe --dbpath e:\data\db"
TIMEOUT /T 10
START "runas /user:administrator" cmd /K "e: & cd MongoDB\Server\3.2\bin & mongo.exe "
