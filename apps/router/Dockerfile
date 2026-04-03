FROM ghcr.io/apollographql/router:v2.10.0

COPY router.yaml /dist/config/router.yaml

EXPOSE 4002

CMD ["--config", "/dist/config/router.yaml", "--log", "warn"]
