# Documentação do Sistema de Notificação de Cotação do Dólar



Este sistema tem como objetivo enviar **notificações** por email informando a cotação atual do dólar em relação ao real. O start do processo é acionado por um fluxo no **Apache NiFi** que está hospedado em uma instância **AWS EC2(Elastic Compute Cloud) **, este fluxo é responsável por requisitar a cotação atual do dólar através da API de cotações de moedas da **AwesomeAPI**, retornado a response da API contendo a cotação nós iremos enviar o payload para o **API Gateway** que está configurado para acionar uma função lambda que é responsável por receber, tratar e enviar um email através do serviço **AWS SES (Amazon Simple Email Service)**. Este fluxo no NiFi tem um cron que está configurado para disparar diariamente às 09h da manhã, dando assim start no fluxo.

## Arquitetura do Sistema

1.  O fluxo NiFi é hospedado em uma instância EC2 configurada com Ubuntu que é responsável por requisitar a cotação do dólar através de uma API de terceiros e enviar para o API Gateway.
    
3.  API Gateway(method post)se acionado dispara a função Lambda.
    
4.  A função Lambda processa o payload que contém a cotação e envia um email com a informação para um endereço específico, utilizando o serviço SES da AWS.


```mermaid
graph LR
A[Start Flow Notification Price 09 AM]
A --> C( Flow Get AwesomeAPI) 
--> B((Flow Send API Gateway))
B --> D(API Gateway)
D --> E(Lambda)
E --> SES
```

### Imagem Fluxo NiFi


<img src=https://user-images.githubusercontent.com/69982713/216749970-a169fa4c-23d0-46ee-8e33-ec3c7794f491.png width="650" />



### Visão geral da função

<img src=https://user-images.githubusercontent.com/69982713/216750035-1d89a526-14a3-4c70-a5ce-d4be6537f275.png width="650" />



### Notificação recebida

<img src=https://user-images.githubusercontent.com/69982713/216750112-4c02115b-efd3-4b0f-9061-650de54b996b.jpg width="250" />
