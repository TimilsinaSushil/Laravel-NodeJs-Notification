FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    bzip2 \
    curl \
    git \
    libonig-dev \
    libpng-dev \
    libxml2-dev \
    unzip \
    zip \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy everything 
COPY . .

# Install dependencies
RUN composer install 

CMD ["php-fpm"]