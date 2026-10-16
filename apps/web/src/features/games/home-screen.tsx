import { Button, EmptyState, Screen, Stack } from "@hmk/ui";
import { useNavigate } from "react-router";

/**
 * Patterns/02 Home: where a player lands after picking a nickname, to create a game or
 * join one with its code. Replace the placeholder; the link to `/dev` goes with it.
 */
export const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <Screen centered>
      <Stack gap={6} align="center">
        <EmptyState
          icon="ruler"
          title="Crear o unirse a una partida"
          description="Esta pantalla la construye el grupo «games»."
        />
        <Button
          variant="secondary"
          icon="chevron-right"
          onClick={() => navigate("/dev")}
        >
          Panel de desarrollo
        </Button>
      </Stack>
    </Screen>
  );
};
