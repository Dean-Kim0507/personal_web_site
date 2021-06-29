dockerize -wait tcp://mysql -timeout 20s

echo "Start server"
npm run backend