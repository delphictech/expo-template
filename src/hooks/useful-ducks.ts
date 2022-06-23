import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/ducks/store';

/*
    File defines useful hooks for react redux with typescript
    Defines hooks for app dispatch and app selector
    See: https://youtu.be/9zySeP5vH9c?t=2772
*/

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
