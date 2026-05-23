# syntax=docker/dockerfile:1.7

# ---- build stage ----
FROM node:22-alpine AS build
WORKDIR /app

# Install deps with lockfile cache reuse (need devDeps for vite build and tsx runtime)
COPY package.json package-lock.json* ./
RUN npm ci

# Build the static client into dist/
COPY . .
RUN npm run build

# ---- runtime stage ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# tsx is in devDependencies and the `start` script uses it to run server/index.ts.
# Keeping the full node_modules tree avoids a second install + lets the existing
# start script run unchanged. The image is still small (~250MB) and this is a
# one-VPS, one-presenter app — no need to optimise further.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
