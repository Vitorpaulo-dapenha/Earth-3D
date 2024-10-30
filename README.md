# 🌍 Visualização Interativa da Terra em 3D

## 🚀 Visão Geral

Este projeto oferece uma **experiência interativa de visualização da Terra em 3D** usando `three.js`. Com ele, você poderá ver o planeta girando, nuvens em movimento e um cenário envolvente, tudo controlado pelos movimentos do mouse ou do dispositivo! 🌌🖱️📱

## 🧩 Arquitetura do Projeto

- **`index.html`**: Estrutura HTML que reúne todos os elementos necessários para renderizar a cena 3D.
- **`main.js`**: Script JavaScript que configura e anima toda a cena.
- **`style.css`**: Define um fundo de tela preto e um layout focado na experiência de imersão total 🌑.

## ⚙️ Recursos Utilizados

- **Bibliotecas Importadas**:
  - `three.min.js`: Renderização 3D.
  - `OrbitControls.js`: Permite o controle orbital da câmera.
  - `DeviceOrientationControls.js`: Para ajustar a câmera em dispositivos móveis.
  - `StereoEffect.js`: Cria efeito VR 📷🕶️.

- **Texturas e Mapas**:
  - `ColorMap.jpg`, `Bump.jpg`, `SpecMask.jpg`: Texturas para dar detalhes visuais à superfície da Terra 🌍.
  - `alphaMap.jpg`: Transparência das nuvens ☁️.
  - `glow.png`: Efeito de brilho ao redor da Terra ✨.

## ✨ Funcionalidades

- **🌍 Rotação da Terra**: A posição da Terra é atualizada a cada minuto com base no horário UTC, criando uma rotação precisa.
- **☁️ Animação de Nuvens**: Nuvens em movimento contínuo.
- **💡 Iluminação Realista**: Inclui uma luz ambiente suave e uma "luz solar" para simular a iluminação natural.
- **🌀 Skybox**: Um céu estonteante ao redor da cena para maior imersão.

## ⚙️ Configuração e Execução

1. **Clone** o repositório.
2. **Abra** o arquivo `index.html` em um navegador que suporte WebGL.
3. Explore com o mouse ou mova seu dispositivo para interagir com a Terra 🌎🖱️📱.

## 🛠️ Dependências

Este projeto depende de uma conexão com a internet para carregar bibliotecas e texturas.

## 👨‍💻 Desenvolvido por

Este projeto foi desenvolvido por **Vitor Paulo da Penha**.

---

Explore e aproveite a experiência! 🌍✨
