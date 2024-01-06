import * as mongoose from "mongoose";
import { Express } from "express";

/**
 * Configure and start the server, connecting to the MongoDB database.
 *
 * @param {Express} server - The Express server instance.
 * @param {number} port - The port on which the server should listen.
 * @param {string} mongoUri - The MongoDB connection URI.
 */

export default function Conf(server: Express, port: number, mongoUri: string): void {
    // Connect to mongodb and start the server
    mongoose
        .connect(mongoUri)
            .then(() => {
                console.log(`Successfully connect to database...`);

                server
                    .listen(port, () => {
                        console.log(`Server running on http://localhost:${port}/`);
                    });
            })
            .catch(error => {
                console.log(`Can't run server.\n${error instanceof Error ? error.message : error}`);
            });
}