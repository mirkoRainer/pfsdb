import { Request, Response } from "express";
import { WELCOME_MESSAGE } from "../constants/pfsdb.constants";
import { PfsDbEntry } from '../models/pfsDbEntry.model'
import { CallbackError, MongooseDocument } from 'mongoose';
import { PfsDbEntryType } from "../fvtt-pf2e-types";

export class PfsDbService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send(WELCOME_MESSAGE);
  }
  public getAllPathfinders(req: Request, res: Response) {
    PfsDbEntry.find({}, (error: Error, pfsDbEntry: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(pfsDbEntry);
    });
  }

  public deletePfsDbEntry(req: Request, res: Response) {
    const pfsDbId = req.params.id;
    console.log(`Deleting ${pfsDbId} from DB.`)
    PfsDbEntry.findByIdAndDelete(pfsDbId, null, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted ? 'Deleted successfully' : 'Pathfinder on not found :(';
      res.send(message);
    });
  }

  public updateOrNewPfsDbEntry(req: Request, res: Response) {
    const pfsDbId = req.params.id;
    console.log(`body: ${req.body.toString()}`)
    PfsDbEntry.findByIdAndUpdate(
      pfsDbId,
      req.body,
      (error: Error, pfsDbEntry: PfsDbEntryType | null) => {
        if (error) {
          console.log(JSON.stringify(error))
          res.send(error);
        }
        if (pfsDbEntry !== null) {
          console.log(`Updating ${pfsDbId} from DB.`)
          res.send("Updated successfully.");
        } else {
          const newPfsDbEntry = new PfsDbEntry(req.body as PfsDbEntryType);
          console.log(`Creating ${pfsDbId} in DB.`)
          console.log(`Using: ${JSON.stringify(newPfsDbEntry)}`)
          newPfsDbEntry.save((error: CallbackError, pfsDbEntry: PfsDbEntryType) => {
            if (error) {
              res.send(error);
            }
            console.log(`newPfsDbEntry ${JSON.stringify(pfsDbEntry)}`);
            res.json(pfsDbEntry);
          });
        }
      }
    );
  }

  public getPfsDbEntry(req: Request, res: Response) {
    const pfsDbId = req.params.id;
    PfsDbEntry.findById(
      pfsDbId,
      req.body,
      undefined,
      (error: CallbackError, pfsDbEntry: PfsDbEntryType | null) => {
        if (error) {
          res.send(error);
        }
        if (pfsDbEntry === null) {
          console.log(`${pfsDbId} not found.`)
          res.status(404).send(`${pfsDbId} not found.`)
        } else {
          console.log(`Sending ${pfsDbId} from DB.`)
          res.json(pfsDbEntry)
        }
      }
    );
  }
}