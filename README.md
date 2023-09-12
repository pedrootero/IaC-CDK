
# IaC AWS/CDK

Este código provisiona uma infraestrutura na AWS com um cluster ECS mais ELB para servir um backend em container.


## Autores

- [@pedrootero](https://www.github.com/pedrootero)

## Tech

- [Node.js] - Linguagem de programação backend para provisionar a infraestrutura
- [AWS-ECS] - Amazon Elastic Container Service (Orquestrador de containers)
- [AWS-ELB] - Amazon Load Balancer (balanceamento de carga)
- [AWS-ECR] - Amazon Elastic Container Registry (Repositório de containers)
- [Docker] - Para criar a imagem do container do backend

## Deploy

### Siga os passos abaixo:


Certifique-se de ter instalado o aws-cli
    
    https://aws.amazon.com/pt/cli/

```bash
  aws --v
```

Verifique se as credenciais AWS estão configuradas.

```bash
  aws configure list
```

Instale as dependencias do projeto 

```bash
  npm i
```
faça o deploy do ambiente 

```bash
  cdk bootstrap
```

```bash
   cdk deploy --all --require-approval never
```
