export const CustomMiddleware = ({ dispatch, getState, store }: any) => (next: any) => (action: any) => {
    if (typeof action === 'function') {
        return action({ dispatch, getState, store });
    }
    return next(action);
}