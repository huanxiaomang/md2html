export interface M2HConfig{
    output: string;
    clean: boolean;
    mode: TMode;
    html: string;
    style: string;
    port: number;
}

type TMode = 'import' | 'inline';