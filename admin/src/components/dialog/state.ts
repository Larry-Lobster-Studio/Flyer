import { create } from 'zustand';

interface IDialogState {
	isOpen: boolean;
	title: string;
}

interface IDialogAction {
	setModalStatus: (isOpen: IDialogState['isOpen']) => void;
}

const useDialogStore = create<IDialogState & IDialogAction>((set) => ({
	isOpen: false,
	title: '',
	setModalStatus: (isOpen) => set(() => ({ isOpen })),
}));
