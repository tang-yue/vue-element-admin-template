FROM registry.corp.hetao101.com/ops/htci:node-stretch as builder

# 在 Dockerfile 中，父镜像的 entrypoint.sh 不会被调用
# 但是我们需要其设置 NPM 环境，因此手动调用一下
ARG NPM_TOKEN
RUN /entrypoint.sh /bin/echo

WORKDIR /project

# 先只拷贝这两个文件，这样如果这两个文件没有更新，
# yarn install 这一步将会被缓存
COPY package.json  yarn.lock  /project/
RUN yarn install

COPY . /project
RUN npm run build

# -------- 8< --------

FROM registry.docker-cn.com/library/nginx:1.13.3-alpine

COPY --from=builder /project/dist /project/dist
ADD  nginx.conf /etc/nginx/conf.d/default.conf
