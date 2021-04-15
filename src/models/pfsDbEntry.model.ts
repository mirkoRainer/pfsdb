import mongoose, { Schema } from "mongoose";
import { PfsDbEntryType } from "../fvtt-pf2e-types";

const LabeledValue: Schema = new mongoose.Schema({
    _id: String,
    label: String,
    value: String,
    type: String,
    exceptions: String,
});
const PfsDbSchema: Schema = new mongoose.Schema({
    _id: Number,
    pfsData: {
        playerNumber: String,
        characterNumber: String,
        levelBump: Boolean,
        fame: Number,
        currentFaction: String,
        school: String,
        reputation: {
            EA: Number,
            GA: Number,
            HH: Number,
            VS: Number,
            RO: Number,
            VW: Number,
        }
    },
    characterData: {
        abilities: {
            strength: Number,
            dexterity: Number,
            constitution: Number,
            intelligence: Number,
            wisdom: Number,
            charisma: Number,
        },
        saves: {
            fortitude: Number,
            reflex: Number,
            will: Number,
        },
        details: {
            keyability: { value: String },
            alignment: { value: String },
            class: { value: String },
            ancestry: { value: String },
            heritage: { value: String },
            deity: { value: String, image: String },
            background: { value: String },
            age: { value: String },
            height: { value: String },
            weight: { value: String },
            gender: { value: String },
            ethnicity: { value: String },
            nationality: { value: String },
            biography: { value: String, public: String },
            xp: {
                value: Number,
                min: Number,
                max: Number,
                pct: Number,
            },
            level: {
                value: Number,
                min: Number,
            },
        },
        speed: {
            value: String,
            otherSpeeds: [LabeledValue],
            total: Number,
        },
        size: String,
        traits: { value: [String], custom: String },
        senses: [LabeledValue],
        languages: { value: [String], custom: String, selected: [String] },
    },
});

export const PfsDbEntry = mongoose.model<PfsDbEntryType>("PfsDbEntry", PfsDbSchema);