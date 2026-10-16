import type { Meta, StoryObj } from "@storybook/react-vite";

import { Frames, PhoneFrame } from "../stories/helpers.tsx";
import { HomeScreen, NewGameScreen } from "./screens.tsx";

const meta: Meta = { title: "Patterns/02 Home", tags: ["games"] };
export default meta;
type S = StoryObj;

export const CreateOrJoin: S = {
  render: () => (
    <Frames>
      <PhoneFrame
        label="Inicio"
        note="«Nueva partida» abre la pantalla de ajustes (NewGame)"
      >
        <HomeScreen />
      </PhoneFrame>
      <PhoneFrame
        label="Código escrito"
        note="«Unirme» se activa con el código completo"
      >
        <HomeScreen code="KQZT" />
      </PhoneFrame>
      <PhoneFrame label="Uniéndose">
        <HomeScreen code="KQZT" joining />
      </PhoneFrame>
    </Frames>
  ),
};
/**
 * Creating a game: «Nueva partida» on the home opens this screen; «Crear partida» creates the game
 * and takes the host to the lobby (03). The rules do not change afterwards. Joining skips this.
 */
export const NewGame: S = {
  render: () => (
    <Frames>
      <PhoneFrame
        label="Nueva partida"
        note="Por defecto: «Crear partida» sin tocar nada juega con impostor"
      >
        <NewGameScreen />
      </PhoneFrame>
      <PhoneFrame label="Creando" note="Al crearla, a la sala de espera (03)">
        <NewGameScreen creating />
      </PhoneFrame>
      <PhoneFrame
        label="Recorte · solo impostor"
        note="Si falta tiempo: el resto de reglas, por defecto y a la vista"
      >
        <NewGameScreen only="impostor" />
      </PhoneFrame>
    </Frames>
  ),
};
/** Open decision: game code format. CodeInput takes length and alphabet as props. */
export const CodeFormat: S = {
  render: () => (
    <Frames>
      <PhoneFrame label="Decisión · formato del código" note="A: 4 letras">
        <HomeScreen code="KQ" />
      </PhoneFrame>
      <PhoneFrame
        label="Decisión · formato del código"
        note="B: 6 letras o números"
      >
        <HomeScreen code="A7K2" codeLength={6} alphabet="alphanumeric" />
      </PhoneFrame>
      <PhoneFrame label="Decisión · formato del código" note="C: 4 números">
        <HomeScreen code="40" alphabet="digits" />
      </PhoneFrame>
    </Frames>
  ),
};
