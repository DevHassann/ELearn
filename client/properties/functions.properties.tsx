// META DATA PROPERTIES
export type MetaDataProps = {
  title: string;
  description: string;
  keywords: string;
};

// CUSTOM MODAL PROPERTIES
export type CustomModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
};
