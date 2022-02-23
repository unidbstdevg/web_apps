docker build . -t my_lamp

docker run --name uni_wa_serv \
    --detach \
    -p "80:80" \
    -v ${PWD}/../app/:/app \
    -v ${PWD}/mysql:/var/lib/mysql \
    my_lamp

