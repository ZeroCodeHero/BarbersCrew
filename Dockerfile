# Minimal static file server on nginx (alpine).
# nginx:alpine already serves /usr/share/nginx/html on port 80 with sensible
# defaults, so no custom nginx.conf is required.
#
# NOTE (not implemented on purpose): if you later want gzip compression and
# long-lived cache headers for faster repeat loads, add an nginx.conf and COPY
# it to /etc/nginx/conf.d/default.conf. Ask before adding — the page is tiny
# enough that it isn't needed today.
FROM nginx:alpine

# Copy only the served assets (keeps the image minimal, no README/Dockerfile inside).
COPY index.html style.css app.js /usr/share/nginx/html/

EXPOSE 80
