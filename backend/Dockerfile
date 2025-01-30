FROM php:8.1-apache

# workdir
WORKDIR /var/www/html

# Apache modules
RUN a2enmod rewrite
RUN a2enmod headers

# Apache config
COPY docker/apache2.conf /etc/apache2/sites-available/000-default.conf

RUN apt-get update

RUN apt-get install -y wget
RUN apt-get install -y libzip-dev
RUN apt-get install -y libpng-dev
RUN apt-get install -y libjpeg-dev
RUN apt-get install -y libfreetype6-dev
RUN apt-get install -y libonig-dev
RUN apt-get install -y libxml2-dev

RUN docker-php-ext-configure gd
RUN docker-php-ext-install gd
RUN docker-php-ext-install mysqli pdo pdo_mysql zip

RUN docker-php-ext-enable pdo_mysql
RUN wget http://launchpadlibrarian.net/510434964/multiarch-support_2.27-3ubuntu1.4_amd64.deb
RUN apt-get install -y ./multiarch-support_2.27-3ubuntu1.4_amd64.deb

RUN curl -s https://getcomposer.org/installer | php \
  && mv composer.phar /usr/local/bin/composer \
  && composer self-update

RUN echo "memory_limit=-1" > /usr/local/etc/php/conf.d/memory-limit-php.ini
