# 🎟️ EventFlow

O **EventFlow** é um aplicativo mobile moderno para **gestão e exploração de eventos**, desenvolvido com **React Native (Expo)** e **Expo Router**.  
Ele oferece uma interface limpa e intuitiva, controle de acesso por tipo de usuário (Admin / Usuário comum) e funcionalidades completas como upload de imagens, mapa interativo e CRUD de eventos e locais.

---

## 🚀 Funcionalidades Principais

### 👥 Autenticação com Perfis
- **Login dinâmico com dois tipos de usuário:**
  - 🧑‍💼 **Administrador:** pode criar, editar e excluir eventos e locais.
  - 🙋‍♂️ **Usuário Comum:** pode explorar e visualizar detalhes dos eventos.
- Controle de sessão e redirecionamento automáticos com **AuthContext**.

---

### 🎫 Eventos
- Listagem de eventos com busca e contagem total.
- Tela de detalhes completa (data, horário, valor, localização e mapa).
- Criação de novos eventos com:
  - Upload de múltiplas imagens da galeria.
  - Seletor de data e horário (mockado).
  - Seleção de local cadastrado ou marcação no mapa.

---

### 🏢 Locais
- Listagem de locais com visualização rápida e ações de editar / excluir.
- Cadastro de novos locais com:
  - Campos de endereço, bairro, CEP e coordenadas.
  - Mapa interativo para selecionar o local exato.

---

### 🧭 Navegação e Estrutura
- **Expo Router** para navegação declarativa e sem dependências extras.
- Controle automático de acesso baseado no papel do usuário.
- Layouts limpos e idênticos ao design do Figma.

---

### 🧭 Menu Global (Header Comum)
- Componente `AppHeader` presente em **todas as telas**.
- Contém:
  - Logo do app
  - Botão de menu lateral com as opções de navegação
  - Logout embutido diretamente no menu
- Itens dinâmicos conforme o perfil logado (Admin / Usuário).

---

## 🔐 Acesso ao Aplicativo (Mockado)

> O EventFlow vem com autenticação simulada para testes locais.  
> Basta usar as credenciais abaixo para navegar no app:

| Tipo de Usuário | E-mail              | Senha    | Permissões |
|-----------------|---------------------|----------|-------------|
| 👑 **Admin** | `admin@email.com` | `123456` | Acesso total (eventos + locais) |
| 🙋‍♂️ **Usuário comum** | `user@email.com`  | `123456` | Somente leitura de eventos |

---

## 🧩 Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|--------------|
| Framework | [Expo](https://expo.dev) + [React Native](https://reactnative.dev) |
| Navegação | [Expo Router](https://expo.github.io/router/docs) |
| Mapa | [react-native-maps](https://github.com/react-native-maps/react-native-maps) |
| Upload de Imagens | [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) |
| Ícones | [@expo/vector-icons](https://icons.expo.fyi) |
| Estilização | `StyleSheet` (React Native puro) |

---

## 🛠️ Como Executar o Projeto Localmente

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/eventflow.git
cd eventflow
