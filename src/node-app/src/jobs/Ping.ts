import {IJob} from "../interfaces/job.interface";

export class Ping implements IJob {
    readonly JOB = 'App.Job.Amqp.Ping';

    constructor(
        private readonly value: string
    ) {

    }

}