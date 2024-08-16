/**
 * normal sprig api
 * this is provided because your project type is 
 */
declare namespace sprig {
    export declare const VALID_INPUTS: readonly ["w", "s", "a", "d", "i", "j", "k", "l"];
    export type InputKey = typeof VALID_INPUTS[number];
    export interface AddTextOptions {
        x?: number;
        y?: number;
        color?: string;
    }
    export declare class SpriteType {
        type: string;
        x: number;
        y: number;
        readonly dx: number;
        readonly dy: number;
        remove(): void;
    }
    export type Rgba = [number, number, number, number];
    export interface TextElement {
        x: number;
        y: number;
        color: Rgba;
        content: string;
    }
    export interface GameState {
        legend: [string, string][];
        texts: TextElement[];
        dimensions: {
            width: number;
            height: number;
        };
        sprites: SpriteType[];
        solids: string[];
        pushable: Record<string, string[]>;
        background: string | null;
    }
    export interface PlayTuneRes {
        end(): void;
        isPlaying(): boolean;
    }
    // export declare const tones: Record<string, number>;
    // export declare const instruments: readonly ["sine", "triangle", "square", "sawtooth"];
    export type InstrumentType = typeof instruments[number];
    // export declare const instrumentKey: Record<string, InstrumentType>;
    // export declare const reverseInstrumentKey: Record<"sine" | "triangle" | "square" | "sawtooth", string>;
    export type Tune = [number, ...(InstrumentType | number | string)[]][];
    export interface FullSprigAPI {
        map(template: TemplateStringsArray, ...params: string[]): string;
        bitmap(template: TemplateStringsArray, ...params: string[]): string;
        color(template: TemplateStringsArray, ...params: string[]): string;
        tune(template: TemplateStringsArray, ...params: string[]): string;
        setMap(string: string): void;
        addText(str: string, opts?: AddTextOptions): void;
        clearText(): void;
        addSprite(x: number, y: number, type: string): void;
        getGrid(): SpriteType[][];
        getTile(x: number, y: number): SpriteType[];
        tilesWith(...matchingTypes: string[]): SpriteType[][];
        clearTile(x: number, y: number): void;
        setSolids(types: string[]): void;
        setPushables(map: Record<string, string[]>): void;
        setBackground(type: string): void;
        getFirst(type: string): SpriteType | undefined;
        getAll(type: string): SpriteType[];
        width(): number;
        height(): number;
        setLegend(...bitmaps: [string, string][]): void;
        onInput(key: InputKey, fn: () => void): void;
        afterInput(fn: () => void): void;
        playTune(text: string, n?: number): PlayTuneRes;
        setTimeout(fn: TimerHandler, ms: number): number;
        setInterval(fn: TimerHandler, ms: number): number;
        clearTimeout(id: number): void;
        clearInterval(id: number): void;
    }
}