import * as mongoose from "mongoose";
import { Express } from "express";

export default function Conf(server: Express, port: number, mongoUri: string): void {
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