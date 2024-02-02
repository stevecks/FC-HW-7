export interface IBook {
    id: string;
    userId: string;
    author: string;
    name: string;
}

export interface IAddBook {
    name: string;
    author: string;
}

export interface IEditBook {
    id: string;
    name: string;
    author: string;
}