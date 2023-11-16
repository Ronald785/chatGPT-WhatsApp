<h1 align="center">
  ChatGPT-WhatsApp
</h1>

<p align="center">
    <a href="#-descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-iniciar-projeto">Iniciar Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-contate-me">Contate-me</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-licença">Licença</a>
</p>

## 📚 Descrição

Bem-vindo ao repositório de Integração ChatGPT-WhatsApp! Este projeto utiliza JavaScript, MongoDB, LangChain e OpenAI para criar uma aplicação poderosa que integra o ChatGPT com a plataforma WhatsApp.

## 👷 Iniciar projeto

```bash
#Copie o repositório
$ git clone https://github.com/Ronald785/chatGPT-WhatsApp

$ cd chatGPT-WhatsApp

#Instale as dependências
$ npm install

#Substitua as variáveis do arquivo .env
```

```bash
#Acesse o script RemoteAuth.js do node_modules
$ Caminho: node_modules/whatsapp-web.js/src/authStrategies/RemoteAuth.js

#Acesse o diretório no terminal
$ cd node_modules/whatsapp-web.js/src/authStrategies

#Instale adm-zip
$ npm install adm-zip

#Adicione no inicio do script
$ var AdmZip = require("adm-zip");

#Encontre a função unCompressSession e substitua pelo código abaixo
async unCompressSession(compressedSessionPath) {
    await new Promise((resolve, reject) => {
        const zip = new AdmZip(compressedSessionPath);
        zip.extractAllToAsync(this.userDataDir, true, false, (err) => {
            if(err)
            { reject(err); }
            else
            { resolve(); }
        });
    });
    await fs.promises.unlink(compressedSessionPath);
}
```

```bash
#Acesse a raiz do projeto /chatGPT-WhatsApp e inicie o app
$ npm start
```

## 📬 Contate-me

<p align="left">
    <a href="https://www.linkedin.com/in/ronald785/">
        <img src="https://github.com/Ronald785/Ronald785/blob/master/images/linkedin.svg" alt="Linkedin icon" width=50/>
    </a>
    &nbsp;
    <a href="mailto:ronaldmateus785@gmail.com">
        <img src="https://github.com/Ronald785/Ronald785/blob/master/images/gmail.svg" alt="Gmail icon" width=50/>
    </a>
</p>

## 📝 Licença

Lançado em 2023, 📝 [Licença MIT](./LICENSE)
