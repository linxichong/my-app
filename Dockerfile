# FROM node as builder
# WORKDIR /app
# COPY . /app
# RUN npm install
# RUN npm run bp

# FROM nginx
# COPY --from=builder /app/dist /usr/share/nginx/html

FROM nginx
COPY /dist /usr/share/nginx/htm