import { Call, CallEndReason, RemoteParticipant, CallAgent } from '@azure/communication-calling';
import { SelectionState } from 'core/RemoteStreamSelector';
import { Reducer } from 'redux';
import {
  CALL_ADDED,
  CALL_REMOVED,
  SET_CALL_STATE,
  SET_GROUP,
  SET_DOMINANT_PARTICIPANTS,
  SET_PARTICIPANTS,
  CallTypes,
  SET_CALL_AGENT,
  SET_MOVE_PARTICIPANT,
  SET_LEAVING_CALL_ID,
  MOVE_CALL_TO_SECONDARY
} from '../actions/calls';

export interface CallsState {
  callAgent?: CallAgent;
  group: string;
  call?: Call;
  secondaryCall?: Call; //used to hold the first call while they join the next meeting
  callState: string;
  incomingCallEndReason: CallEndReason | undefined;
  groupCallEndReason: CallEndReason | undefined;
  remoteParticipants: RemoteParticipant[];
  attempts: number;
  dominantParticipants: SelectionState[];
  leavingCallId: string;
}

const initialState: CallsState = {
  callAgent: undefined,
  call: undefined,
  secondaryCall: undefined,
  callState: 'None',
  incomingCallEndReason: undefined,
  groupCallEndReason: undefined,
  remoteParticipants: [],
  dominantParticipants: [],
  group: '',
  attempts: 0,
  leavingCallId: ''
};

export const callsReducer: Reducer<CallsState, CallTypes> = (state = initialState, action: CallTypes): CallsState => {
  switch (action.type) {
    case SET_CALL_AGENT:
      return { ...state, callAgent: action.callAgent };
    case CALL_ADDED:
      return { ...state, call: action.call };
    case CALL_REMOVED:
      return {
        ...state,
        call: undefined,
        remoteParticipants: [],
        incomingCallEndReason: action.incomingCallEndReason,
        groupCallEndReason: action.groupCallEndReason
      };
    case SET_CALL_STATE:
      return { ...state, callState: action.callState };
    case SET_DOMINANT_PARTICIPANTS:
      return { ...state, dominantParticipants: action.dominantParticipants };
    case SET_PARTICIPANTS:
      return { ...state, remoteParticipants: action.remoteParticipants };
    case SET_GROUP:
      return { ...state, group: action.group };
    // case SET_MOVE_PARTICIPANT:
    //   return {
    //     ...state
    //   }
    case MOVE_CALL_TO_SECONDARY:
      return { ...state, call: action.call, secondaryCall: action.secondaryCall, remoteParticipants: action.remoteParticipants };
    case SET_LEAVING_CALL_ID:
      return { ...state, leavingCallId: action.callId, secondaryCall: undefined
      }
    default:
      return state;
  }
};
