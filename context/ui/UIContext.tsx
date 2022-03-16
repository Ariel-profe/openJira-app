import { createContext } from 'react';


interface ContextProps {
      sidemenuOpen: boolean;
      isAddingEntry: boolean;
      isDragging:boolean;

      //Metodos del contexto para que consuma el provider
      openSideMenu: ()=>void;
      closeSideMenu: ()=>void;
      setIsAddingEntry: (isAdding:boolean)=>void;

      startDragging: () => void;
      endDragging: () => void;
};

export const UIContext = createContext( {} as ContextProps );