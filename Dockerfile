FROM dlanguage/dmd

RUN apt-get update && apt-get install -y curl git 

WORKDIR /root

RUN mkdir ./MyWormNET2

ADD . / MyWormNET2/

WORKDIR /root/MyWormNET2

RUN mv ./mywormnet2-sample.ini ./mywormnet2.ini 

RUN dub build mywormnet2

EXPOSE 80
EXPOSE 6667

CMD ["./mywormnet2"]
