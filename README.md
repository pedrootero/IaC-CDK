
# IaC AWS/CDK

Este código provisiona uma infraestrutura na AWS com um cluster ECS e ELB para servir um contêiner para um aplicativo backend.


## Autores

- [@pedrootero](https://www.github.com/pedrootero)


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
