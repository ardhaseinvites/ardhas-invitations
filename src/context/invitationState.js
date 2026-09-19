import { getEventDefaults, eventTypes, templates } from "../data/events.js";

export const createInvitationState = () => ({
  activeEvent: "Wedding",
  drafts: { Wedding: getEventDefaults() },
});

export function invitationReducer(state, action) {
  if (action.type === "event") {
    if (!eventTypes.includes(action.eventType)) return state;
    return {
      activeEvent: action.eventType,
      drafts: {
        ...state.drafts,
        [action.eventType]:
          state.drafts[action.eventType] || getEventDefaults(action.eventType),
      },
    };
  }
  if (action.type === "template") {
    const design = templates.find((item) => item.id === action.id);
    if (!design) return state;
    const current =
      state.drafts[design.eventType] || getEventDefaults(design.eventType);
    return {
      activeEvent: design.eventType,
      drafts: {
        ...state.drafts,
        [design.eventType]: {
          ...current,
          template: design.id,
          style: design.style,
          layout: design.layout,
          color: design.color,
          font: design.font,
          background: design.background,
        },
      },
    };
  }
  if (action.type === "reset")
    return {
      ...state,
      drafts: {
        ...state.drafts,
        [state.activeEvent]: getEventDefaults(state.activeEvent),
      },
    };
  if (action.type === "update") {
    const { eventType, ...patch } = action.patch;
    const event = eventTypes.includes(eventType)
      ? eventType
      : state.activeEvent;
    return {
      activeEvent: event,
      drafts: {
        ...state.drafts,
        [event]: {
          ...(state.drafts[event] || getEventDefaults(event)),
          ...patch,
          eventType: event,
        },
      },
    };
  }
  return state;
}
