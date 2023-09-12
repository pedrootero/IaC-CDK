
# ECS + ELB cluster provisioning

This code provisions an infrastructure on AWS with an ECS cluster and ELB to serve a container for a backend application.


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
