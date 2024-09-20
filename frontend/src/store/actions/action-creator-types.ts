import type Action from './action.interface';

export type ActionCreatorWithMeta = (payload: any, onSuccess: () => void, onError: (errors: any) => void) => Action;
