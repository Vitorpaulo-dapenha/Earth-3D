# Visualização da Terra em 3D

## Visão Geral

Este projeto oferece uma visualização interativa da Terra em 3D utilizando `three.js`. Ele inclui a rotação da Terra e animações de nuvens e céu, com controle por meio de interação do usuário.

## Arquitetura do Projeto

- **index.html**: Estrutura HTML básica contendo os scripts necessários para renderizar a cena.
- **main.js**: Script JavaScript principal que inicializa e anima a cena.
- **style.css**: Arquivo de estilo que define o fundo preto e remove margens e rolagem.

## Recursos Utilizados

- **Bibliotecas Importadas**:
  - `three.min.js`: Renderização 3D.
  - `OrbitControls.js`: Controles orbitais da câmera.
  - `DeviceOrientationControls.js`: Controles para dispositivos móveis.
  - `StereoEffect.js`: Cria um efeito VR.
  
- **Texturas e Mapas**:
  - `ColorMap.jpg`, `Bump.jpg`, `SpecMask.jpg`: Imagens usadas para texturizar a superfície e criar efeitos de iluminação da Terra.
  - `alphaMap.jpg`: Cria o efeito de transparência para as nuvens.
  - `glow.png`: Efeito de brilho em torno da Terra.

## Funcionalidades

- **Rotação da Terra**: Calculada com base no horário UTC, atualizada a cada minuto.
- **Animação das Nuvens**: Movimento contínuo das nuvens ao redor da Terra.
- **Iluminação Realista**: Luz ambiente e "sol" simulando a iluminação do planeta.
- **Skybox**: Fundo de céu ao redor da cena para um efeito mais imersivo.

## Configuração e Execução

1. Clone o repositório.
2. Abra `index.html` em um navegador que suporte WebGL.
3. Utilize o mouse para rotacionar e interagir com a Terra. Em dispositivos móveis, o movimento do dispositivo altera a visão.

## Dependências

Este projeto depende de uma conexão com a internet para carregar bibliotecas e texturas.
