import { createContext, useContext, useReducer, useCallback } from "react";
import { createInvitationState, invitationReducer } from "./invitationState";
const InvitationContext = createContext(null);
export function InvitationProvider({ children }) {
  const [state, dispatch] = useReducer(
    invitationReducer,
    undefined,
    createInvitationState,
  );
  const updateConfig = useCallback(
    (patch) => dispatch({ type: "update", patch }),
    [],
  );
  const applyTemplate = useCallback(
    (id) => dispatch({ type: "template", id }),
    [],
  );
  const selectEvent = useCallback(
    (eventType) => dispatch({ type: "event", eventType }),
    [],
  );
  const resetConfig = useCallback(() => dispatch({ type: "reset" }), []);
  return (
    <InvitationContext.Provider
      value={{
        config: state.drafts[state.activeEvent],
        updateConfig,
        applyTemplate,
        selectEvent,
        resetConfig,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
}
export function useInvitation() {
  const value = useContext(InvitationContext);
  if (!value) throw new Error("InvitationProvider is required");
  return value;
}
