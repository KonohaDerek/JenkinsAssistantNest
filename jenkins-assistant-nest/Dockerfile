FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache -q curl
# install nestjs/cli
RUN npm install -g @nestjs/cli
#  install pnpm
RUN npm install -g pnpm

FROM base AS builder
# Install basic development tools
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM base AS production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set the entrypoint to allow using bash
ENTRYPOINT ["node", "dist/main.js", "$@"]

# Define the command to run.  This will allow command-line arguments
CMD ["/bin/sh", "-c"]