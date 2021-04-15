import { Document } from "mongoose";

export interface PfsDbEntryType extends Document {
    key: string; // Concatenate player and character number
    PfsData: RawPathfinderSocietyData;
    CharacterData: {
        abilities: {
            strength: number;
            dexterity: number;
            constitution: number;
            intelligence: number;
            wisdom: number;
            charisma: number;
        };
        saves: {
            fortitude: ZeroToFour;
            reflex: ZeroToFour;
            will: ZeroToFour;
        };
        details: {
            keyability: { value: AbilityString };
            alignment: { value: string };
            class: { value: string };
            ancestry: { value: string };
            heritage: { value: string };
            deity: { value: string; image: string };
            background: { value: string };
            age: { value: string };
            height: { value: string };
            weight: { value: string };
            gender: { value: string };
            ethnicity: { value: string };
            nationality: { value: string };
            biography: { value: string; public?: string };
            xp: {
                value: number;
                min: number;
                max: number;
                pct: number;
            };
            level: {
                value: number;
                min: number;
            };
        };
        speed: {
            value: string;
            otherSpeeds: LabeledValue[];
            total: number;
        };
        size: Size;
        traits: ValuesList;
        senses: LabeledString[];
        languages: ValuesList<string>;
    };
}

export interface RawPathfinderSocietyData {
    /** Number assigned to the player. */
    playerNumber: string;
    /** Number assigned to the character. */
    characterNumber: string;
    /** Is the character currently affected by a level bump? */
    levelBump: boolean;
    /** Character's current fame */
    fame: number;
    /** Character's currently slotted faction */
    currentFaction: PFSFactionString;

    /** Character's Pathfinder school */
    school: PFSSchoolString;

    /** Character's Reputation with all the factions */
    reputation: PathfinderSocietyReputation;
}

export type PFSFactionString = 'EA' | 'GA' | 'HH' | 'VS' | 'RO' | 'VW';
export type PFSSchoolString = 'none' | 'scrolls' | 'spells' | 'swords';
export interface PathfinderSocietyReputation {
    EA: number;
    GA: number;
    HH: number;
    VS: number;
    RO: number;
    VW: number;
}
export type ZeroToThree = 0 | 1 | 2 | 3;
export type ZeroToFour = ZeroToThree | 4; // +1!
export interface Abilities {
    str: AbilityData;
    dex: AbilityData;
    con: AbilityData;
    int: AbilityData;
    wis: AbilityData;
    cha: AbilityData;
}

/** A type representing the possible ability strings. */
export type AbilityString = keyof Abilities;
export interface AbilityData {
    /** The raw value of this ability score; computed from the mod for npcs automatically. */
    value: number;
    /** The minimum value this ability score can have. */
    min: number;
    /** The modifier for this ability; computed from the value for characters automatically. */
    mod: number;
}
export interface LabeledValue {
    _id: string;
    label: string;
    value: number | string;
    type: string;
    exceptions?: string;
}
export type Size = 'tiny' | 'sm' | 'med' | 'lg' | 'huge' | 'grg';
export interface ValuesList<T extends string = string> {
    value: T[];
    custom: string;
}
export interface LabeledString extends LabeledValue {
    value: string;
}