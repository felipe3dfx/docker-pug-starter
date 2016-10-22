FROM node:wheezy

WORKDIR /usr/local/lib/
RUN wget https://github.com/sass/libsass/archive/3.3.6.tar.gz \
    && tar xvzf 3.3.6.tar.gz && rm 3.3.6.tar.gz
ENV SASS_LIBSASS_PATH "/usr/local/lib/libsass-3.3.6"
RUN echo 'SASS_LIBSASS_PATH="/usr/local/lib/libsass-3.3.6"' >> /etc/environment
RUN wget https://github.com/sass/sassc/archive/3.3.6.tar.gz \
    && tar xvzf 3.3.6.tar.gz && rm 3.3.6.tar.gz
WORKDIR /usr/local/lib/sassc-3.3.6/
RUN make && ln -s /usr/local/lib/sassc-3.3.6/bin/sassc /usr/local/bin/sassc

RUN mkdir /code
WORKDIR /code
RUN npm install -g gulp bower http-server
