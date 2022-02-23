FROM mattrayner/lamp:latest-2004-php8

# enable errors displaying in php
RUN printf 'error_reporting = E_ALL \ndisplay_errors = On \ndisplay_startup_errors = On' \
        >> /etc/php/8.0/apache2/php.ini

# enable htaccess file
RUN sed -i 's/<Directory \/>/<Directory \/var\/www\/>/' \
        /etc/apache2/sites-available/000-default.conf
