#
# Base

FROM node:18.12.1-buster-slim as base

ENV DEBIAN_FRONTEND noninteractive
ENV TZ 'America/Los_Angeles'

RUN apt-get update && echo $TZ > /etc/timezone && \
  apt-get update && apt-get install -y tzdata && \
  rm /etc/localtime && \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata && \
  apt-get install -y x11vnc sudo bash xvfb procps && \
  useradd -ms /bin/bash macintosh && echo 'macintosh:macintosh' | chpasswd && \
  echo "macintosh ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers && apt-get clean

USER macintosh
WORKDIR /home/macintosh

COPY /applications/emulator/mini-vmac/ /mini-vmac/

RUN mkdir -vp /home/macintosh/.vnc > /dev/null 2>&1
RUN x11vnc -storepasswd mini-vmac /home/macintosh/.vnc/passwd > /dev/null 2>&1

RUN sudo chmod +x /mini-vmac/start.sh \
  /mini-vmac/mini-vmac-1x \
  /mini-vmac/mini-vmac-4x

EXPOSE 4000
EXPOSE 59000

# Packages

FROM base as packages

USER root
WORKDIR /workspace

RUN --mount=type=bind,target=/docker-context \
  cd /docker-context/; \
  find . -name "package.json" -mindepth 0 -maxdepth 4 -exec cp --parents "{}" /workspace/ \;

#
# Development

FROM base as development

USER root
WORKDIR /workspace

COPY --from=packages /workspace/ .

COPY .yarn/ .yarn/
COPY .yarnrc.yml yarn.lock ./

RUN \
  npm pkg set scripts.postinstall="echo noop" && \
  yarn workspaces focus jamie.rolfs.sh emulator \
  ;

CMD ["yarn", "workspace", "emulator", "run", "start:develop"]


#
# Production

# Build

FROM base as build

USER root
WORKDIR /workspace

COPY --from=packages /workspace/ .

COPY .yarn/ .yarn/
COPY .yarnrc.yml yarn.lock ./

RUN \
  npm pkg set scripts.postinstall="echo noop" && \
  yarn workspaces focus --production jamie.rolfs.sh emulator && \
  cp -R node_modules/ ../production_modules/ && \
  yarn workspaces focus jamie.rolfs.sh emulator \
  ;

COPY . .

RUN \
  yarn build:emulator && \
  rm -fr /production_modules/@jrolfs && \
  cp -RL node_modules/@jrolfs ../production_modules/ \
  ;

# Release

FROM base as release

USER root
WORKDIR /application

COPY --from=build /production_modules ./node_modules
COPY --from=build /workspace/applications/emulator/build .

ENV PORT 4000
EXPOSE ${PORT}

CMD ["node", "./index.js"]
