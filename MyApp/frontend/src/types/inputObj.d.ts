interface IOption {
    id: number;
    title: string;
}

interface IInputObj {
    comp: string;
    label: string;
    name: string;
    isRequired: boolean;
    isMultiple?: boolean;
    type?: string;
    placeholder?: string;
    defaultValue?: string;
    helperText?: string;
    options?: IOption[] | string[];
};