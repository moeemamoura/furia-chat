  📟 FURIA Fan Chat 

Este projeto foi desenvolvido como parte do desafio de experiência conversacional da FURIA. O objetivo foi criar um ambiente interativo que simula a experiência de um torcedor durante uma partida de CS, com interface estilizada, placar, chat entre torcedores e representação dos jogadores.

  🎯 Funcionalidades

Exibição do placar ao vivo e nome do mapa

Listagem de jogadores com barra de vida

Chat para torcedores com envio de mensagens

Emojis interativos (palmas e coração)

Auto-scroll para a última mensagem

Estilização com fontes e gradientes personalizados usando Tailwind CSS

 💡 Componentes criados

PlayerInfo

Exibe o nome do jogador e sua barra de vida, com estilo invertido caso esteja no time adversário.

ChatMessage

Renderiza mensagens enviadas no chat. Identifica se é do usuário e mostra o ícone correspondente. Emojis de reacao também são renderizados.

ChatBot

Exibe mensagens automáticas como próximos jogos, funcionando como um bot de informações no chat.

 🚀 Tecnologias usadas

React + TypeScript

Tailwind CSS

Phosphor Icons

Google Fonts

  📂 Como rodar o projeto

npm install
npm start

  📈 Estrutura de arquivos principais
  
  -src/

  - App.tsx – Componente principal que integra o layout geral da aplicação.
  
      - components/ – Contém os componentes reutilizáveis:
  
          - ChatBot.tsx – Mensagens automáticas no chat.
  
          - ChatMessage.tsx – Mensagens dos usuários e emojis.
  
          - PlayerInfo.tsx – Informações dos jogadores e barra de vida.
  
       - images/ – Imagens utilizadas na interface:
  
          - furia.png, game.jpg, logo.png

        - index.css – Estilização base da aplicação.

  🖊️ Estilização

Tailwind CSS customizado com:

Fontes: Russo One, Squada One, Wallpoet, Goblin One

Gradientes de texto e fundo

Animações e responsividade com flex, grid e overflow-auto

  📅 Funcionalidade extra implementada

Scroll automático até a última mensagem com:

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

  📍 Protótipo inicial (Figma)

![image](https://github.com/user-attachments/assets/5ddca49e-69be-4f35-839d-44f43c5b507a)




