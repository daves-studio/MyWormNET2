FROM node:latest 

WORKDIR /root

RUN mkdir ./MyWormNET2-Proxy

ADD . / MyWormNET2-Proxy/

WORKDIR /root/MyWormNET2-Proxy

EXPOSE 9301
EXPOSE 9302
EXPOSE 9303

CMD ["node", "/root/MyWormNET2-Proxy/proxy.js"]
