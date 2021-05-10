import { Document } from "mongoose";

export interface PfsDbEntryType extends Document {
    _id: string; // Concatenate player and character number
    pfsData: RawPathfinderSocietyData;
    items: PfsDbItem[];
    characterData: {
        abilities: {
            strength: number;
            dexterity: number;
            constitution: number;
            intelligence: number;
            wisdom: number;
            charisma: number;
        };
        details: RawCharacterDataDetails;
        languages: ValuesList<string>;
    };
}

export interface RawCharacterDataDetails {
    /** The key ability which class saves (and other class-related things) scale off of. */
    keyability: { value: AbilityString };

    /** Character alignment (LN, N, NG, etc.) */
    alignment: { value: string };
    /** Character class ('barbarian', 'fighter', etc.) */
    class: { value: string };
    /** Character ancestry (their race, generally). */
    ancestry: { value: string };
    /** Character heritage (what specific kind of race they are, like 'Warmarch Hobgoblin'). */
    heritage: { value: string };
    /** The diety that the character worships (and an image of the diety symbol). */
    deity: { value: string; image: string };
    /** Character background - their occupation, upbringing, etc. */
    background: { value: string };
    /** How old the character is (user-provided field). */
    age: { value: string };
    /** Character height (user-provided field). */
    height: { value: string };
    /** Character weight (user-provided field). */
    weight: { value: string };
    /** Character gender/pronouns (user-provided field). */
    gender: { value: string };
    /** Character ethnicity (user-provided field). */
    ethnicity: { value: string };
    /** Character nationality (i.e, what nation they hail from; user-provided field). */
    nationality: { value: string };
    /** User-provided biography for their character; value is HTML. */
    biography: { value: string; public?: string };

    /** The amount of experience this character has. */
    xp: {
        /** The current experience value.  */
        value: number;
        /** The minimum amount of experience (almost always '0'). */
        min: number;
        /** The maximum amount of experience before level up (usually '1000', but may differ.) */
        max: number;
        /** COMPUTED: The percentage completion of the current level (value / max). */
        pct: number;
    };

    /** Information about the current character level. */
    level: {
        /** The current level of this character. */
        value: number;
        /** The minimum level (almost always '1'). */
        min: number;
    };
}

interface PfsDbItem {
    sourceId: string;
    data?: any; // PhysicalDetailsData
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